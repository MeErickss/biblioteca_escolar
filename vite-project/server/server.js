import 'dotenv/config';
import express from 'express'
import pkg from 'pg';
import cors from 'cors';

const { Pool } = pkg;
const app = express()

app.use(cors());
app.use(express.json());

// Configuração do pool de conexões
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Rota básica de saúde do servidor
app.get('/', (req, res) => {
  res.send('Servidor da Biblioteca Escolar está rodando');
});

const PORT = 5000; // Fallback para 5000 se PORT não estiver definido

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Banco de dados configurado: ${process.env.DATABASE_URL?.split('@')[1]?.split('/')[0] || 'URL não disponível'}`);
});

// Exemplo com Express + MySQL
app.get("/api/tables", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
        AND table_type = 'BASE TABLE';
    `);

    // Verifica se result e result.rows existem
    if (!result || !Array.isArray(result.rows)) {
      return res.status(500).json({ error: "Resposta inesperada do banco de dados." });
    }

    const tables = result.rows.map(row => row.table_name);
    res.json(tables);
  } catch (err) {
    console.error("Erro ao buscar tabelas:", err);
    res.status(500).json({ error: "Erro ao buscar tabelas." });
  }
});

app.get('/api/livro/:id', async (req, res) => {
  const { id } = req.params;
  const sql = `
    SELECT 
      l.*,
      a.nome       AS autor,
      c.descricao  AS categoria
    FROM livro l
    LEFT JOIN livro_autores la ON la.livro_id = l.id
    LEFT JOIN autor a         ON a.id        = la.autor_id
    LEFT JOIN categoria c     ON c.id        = l.id_categoria
    WHERE l.id = $1
    LIMIT 1
  `;
  let client;
  try {
    client = await pool.connect();
    const result = await client.query(sql, [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Livro não encontrado.' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Erro ao buscar livro por id:', err);
    res.status(500).json({ error: 'Erro ao buscar livro no banco.' });
  } finally {
    if (client) client.release();
  }
});

app.get('/api/emprestimos/:locatorioId', async (req, res) => {
  const { locatorioId } = req.params;

  const sql = `
    SELECT
      e.id                                               AS id,
      l.titulo                                           AS livro,
      to_char(e.data_emprestimo,         'DD/MM/YYYY')   AS dataEmprestimo,
      to_char(e.data_devolucao_prevista, 'DD/MM/YYYY')   AS dataDevolucaoPrevista,
      to_char(e.data_devolucao,          'DD/MM/YYYY')   AS dataDevolucaoReal,
      CASE
        WHEN e.status = 'ATIVO'     THEN 'Em andamento'
        WHEN e.status = 'ATRASADO'  THEN 'Atrasado'
        WHEN e.status = 'CONCLUIDO' THEN 'Devolvido'
        ELSE e.status::text
      END                                               AS status,
      dv.atraso                                          AS diasAtraso,
      dv.multa                                           AS valorMulta
    FROM emprestimo e
    JOIN livro     l    ON e.id_livro     = l.id
    JOIN locatorio loc  ON e.id_usuario   = loc.id
    LEFT JOIN divida  dv   ON dv.id_emprestimo = e.id
    WHERE e.id_usuario = $1
    ORDER BY e.data_emprestimo DESC;
  `;

  try {
    const { rows } = await pool.query(sql, [locatorioId]);
    return res.json(rows);
  } catch (err) {
    console.error('Erro ao buscar histórico de empréstimos:', err);
    return res.status(500).json({ error: 'Erro ao buscar empréstimos' });
  }
});



app.get('/api/select', async (req, res) => {
  // 1) Queries sem parâmetro
  const simples = {
    autor:      'SELECT * FROM autor;',
    cargo:      'SELECT * FROM cargo;',
    categoria:  'SELECT * FROM categoria;',
    curso:      'SELECT * FROM curso;',
    divida:     'SELECT * FROM divida;',
    editora:    'SELECT * FROM editora;',
    emprestimo: 'SELECT * FROM emprestimo;',
    livro:      'SELECT * FROM livro;',
    locatorio:  'SELECT * FROM locatorio;',
    subcategoria: 'SELECT * FROM subcategoria;',
    populares:  'SELECT * FROM livro l WHERE id < 10;',
  };

  // 2) Queries que aceitam filtro (exemplo aqui puxa categoria por descrição)
  const parametrizadas = {
    categoriaPorDescricao:
      `SELECT descricao 
         FROM categoria c 
         JOIN livro l ON l.id_categoria = c.id 
        WHERE c.descricao = $1;`
  };

  const { table, filtro } = req.query;

  // Escolhe em qual objeto está a consulta
  let sql;
  let params = [];

  if (simples[table]) {
    sql = simples[table];
  } else if (table === 'categoriaPorDescricao') {
    // só entra aqui se o cliente pediu esse endpoint específico
    sql = parametrizadas[table];
    if (filtro) {
      params = [filtro];
    } else {
      return res
        .status(400)
        .json({ success: false, error: 'Parâmetro "filtro" é obrigatório para essa query.' });
    }
  } else {
    return res
      .status(400)
      .json({ success: false, error: `Tabela "${table}" não reconhecida.` });
  }

  let client;
  try {
    client = await pool.connect();
    const result = await client.query(sql, params);
    return res.json(result.rows);
  } catch (err) {
    console.error('Erro ao executar query:', err);
    return res.status(500).json({
      success: false,
      error: 'Erro ao buscar dados no banco de dados'
    });
  } finally {
    if (client) client.release();
  }
});


app.get('/api/pesquisa', async (req, res) => {
  // 1) SQL com placeholder $1
  const sql = `
    SELECT *
      FROM livro l
     WHERE l.titulo ILIKE $1
  `;

  const { pesquisa } = req.query;

  // 2) Validação simples
  if (!pesquisa) {
    return res.status(400).json({
      success: false,
      error: 'Parâmetro "pesquisa" é obrigatório.'
    });
  }

  let client;
  try {
    client = await pool.connect();
    // 3) Passa o '%pesquisa%' como único parâmetro
    const result = await client.query(sql, [`%${pesquisa}%`]);
    return res.json(result.rows);
  } catch (err) {
    console.error('Erro ao buscar livros:', err);
    return res.status(500).json({
      success: false,
      error: 'Erro ao buscar livros no banco de dados.'
    });
  } finally {
    if (client) client.release();
  }
});



app.post('/api/insert', async (req, res) => {
  const { table, data } = req.body;    // data = { descricao: 'xxx', ativo: true, ... }
  const cols = Object.keys(data);      // ex: ['descricao','ativo']
  const placeholders = cols.map((_, i) => `$${i+1}`).join(',');  // '$1,$2'
  const sql = `
    INSERT INTO ${table} (${cols.join(',')})
    VALUES (${placeholders})
    RETURNING *;
  `;
  const params = cols.map(c => data[c]);

  let client;
  try {
    client = await pool.connect();
    const result = await client.query(sql, params);
    res.status(201).json({ success: true, inserted: result.rows[0] });
  } catch (err) {
    console.error('Erro ao inserir:', err);
    res.status(500).json({ success: false, error: 'Erro ao inserir no banco.' });
  } finally {
    if (client) client.release();
  }
});


app.delete('/api/delete', async (req, res) => {
  const map = {
    autor:"DELETE FROM autor WHERE id=$1;",
    cargo:"DELETE FROM cargo WHERE id=$1;",
    categoria:"DELETE FROM categoria WHERE id=$1;",
    curso:"DELETE FROM curso WHERE id=$1;",
    divida:"DELETE FROM divida WHERE id=$1;",
    editora:"DELETE FROM editora WHERE id=$1;",
    emprestimo:"DELETE FROM emprestimo WHERE id=$1;",
    livro:"DELETE FROM livro WHERE id=$1;",
    locatorio:"DELETE FROM locatorio WHERE id=$1;",
    subcategoria:"DELETE FROM subcategoria WHERE id=$1;"
  }

  const { table, id } = req.body;
  let client;

  try {
    client = await pool.connect();

    const sqlText = map[table];


    await client.query(sqlText, [id]);


    return res.status(201).json({
      success: true,
    });

  } catch (err) {
    console.error('Erro ao inserir autor:', err);
    return res.status(500).json({
      success: false,
      error: 'Erro ao inserir autor no banco de dados'
    });

  } finally {
    if (client) client.release();
  }
});

app.put('/api/update', async (req, res) => {
  const { table, data } = req.body;
  // extrai o id e o resto dos campos
  const { id, ...fields } = data;

  const cols = Object.keys(fields);             // ex: ['descricao','ativo']
  if (cols.length === 0) {
    return res.status(400).json({ error: 'Nenhum campo para atualizar.' });
  }

  // monta SET: ["descricao = $1","ativo = $2"] -> "descricao = $1, ativo = $2"
  const setClause = cols.map((col, i) => `${col} = $${i+1}`).join(', ');

  // placeholder final para o WHERE id = $N
  const sql = `UPDATE ${table} SET ${setClause} WHERE id = $${cols.length+1}`;

  const params = cols.map(c => fields[c]).concat(id);

  let client;
  try {
    client = await pool.connect();
    await client.query(sql, params);
    return res.json({ success: true });
  } catch (err) {
    console.error('Erro no update:', err);
    return res.status(500).json({ success: false, error: 'Erro ao atualizar registro.' });
  } finally {
    if (client) client.release();
  }
});

app.get('/api/filter/:type', async (req, res) => {
  const { type } = req.params;
  const term = req.query.term || '';
  if (!['autor','titulo','categoria'].includes(type)) {
    return res.status(400).json({ error: `Filtro "${type}" não suportado.` });
  }

  const like = `%${term}%`;
  let sql, params;
  switch (type) {
    case 'autor':
      sql = `
        SELECT l.*
          FROM livro l
          JOIN livro_autores la ON la.livro_id = l.id
          JOIN autor a         ON a.id        = la.autor_id
      `;
      params = [like];
      break;
    case 'titulo':
      sql = `
        SELECT *
          FROM livro
      `;
      params = [like];
      break;
    case 'categoria':
      sql = `
        SELECT l.*
          FROM livro l
          JOIN categoria c ON c.id = l.id_categoria
      `;
      params = [like];
      break;
  }

  let client;
  try {
    client = await pool.connect();
    const result = await client.query(sql, params);
    return res.json(result.rows);
  } catch (err) {
    console.error('Erro no filtro:', err);
    return res.status(500).json({ error: 'Erro ao executar filtro no banco.' });
  } finally {
    if (client) client.release();
  }
});