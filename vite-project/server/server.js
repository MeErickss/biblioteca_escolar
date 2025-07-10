import 'dotenv/config';
import express from 'express'
import pkg from 'pg';
import cors from 'cors';
import dotenv from "dotenv"
import fetch from 'node-fetch';

dotenv.config();

const { Pool } = pkg;
const app = express()

app.use(cors());
app.use(express.json());

// Configuração do pool de conexões
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  HF_TOKEN:process.env.HF_TOKEN,
  HF_ENDPOINT_URL:process.env.HF_ENDPOINT_URL,
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
      EXTRACT(YEAR FROM l.datapublicacao)::INT AS ano,
      COALESCE(c.descricao, '') AS categoria,
      json_agg(json_build_object('id', a.id, 'nome', a.nome)) FILTER (WHERE a.id IS NOT NULL) AS autores
    FROM livro l
    LEFT JOIN categoria c ON c.id = l.id_categoria
    LEFT JOIN livro_autor la ON la.id_livro = l.id
    LEFT JOIN autor a ON la.id_autor = a.id
    WHERE l.id = $1
    GROUP BY l.id, c.descricao;
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


// Retorna todos os empréstimos (independente de locatário)
app.get('/api/emprestimos', async (req, res) => {
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
      dv.multa                                           AS valorMulta,
      loc.nome                                           AS nomeLocatario
    FROM emprestimo e
    JOIN livro     l    ON e.id_livro     = l.id
    JOIN locatorio loc  ON e.id_usuario   = loc.id
    LEFT JOIN divida  dv   ON dv.id_emprestimo = e.id
    ORDER BY e.data_emprestimo DESC;
  `;

  try {
    const { rows } = await pool.query(sql);
    return res.json(rows);
  } catch (err) {
    console.error('Erro ao buscar TODOS os empréstimos:', err);
    return res.status(500).json({ error: 'Erro ao buscar empréstimos' });
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

app.post('/api/recommend', async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: 'Campo "prompt" é obrigatório.' });
  }

  console.log(process.env.HF_TOKEN)

  try {
    const hfResponse = await fetch(
  process.env.HF_ENDPOINT_URL,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.HF_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            max_new_tokens: 100,
            temperature: 0.7,
            top_p: 0.9
          }
        }),
      }
    );

    if (!hfResponse.ok) {
      const text = await hfResponse.text();
      console.error('Hugging Face error:', hfResponse.status, text);
      return res
        .status(hfResponse.status)
        .json({ error: 'Erro na API Hugging Face', details: text });
    }

    const data = await hfResponse.json();
    // data é um array; cada objeto tem generated_text
    const generated = data[0]?.generated_text ?? '';
    res.json({ generated_text: generated });

  } catch (err) {
    console.error('Erro na rota /api/recommend:', err);
    res.status(500).json({ error: 'Erro interno no servidor.' });
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
    livro:      "SELECT *,EXTRACT(YEAR FROM l.datapublicacao)::INT AS ano, COALESCE(c.descricao, '') AS categoria FROM livro l LEFT JOIN categoria c ON c.id = l.id_categoria;",
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

// server.js (trecho completo da rota /api/filter/:type)

// server.js (trecho relevante)
app.get('/api/filter/:type', async (req, res) => {
  const { type } = req.params;
  const term = req.query.term || '';

  if (type !== 'categoria') {
    return res.status(400).json({ error: `Só filtro por categoria é suportado.` });
  }

  const like = `%${term}%`;

  const sql = `
    SELECT
      l.id,
      l.titulo,
      EXTRACT(YEAR FROM l.datapublicacao)::INT AS ano,
      COALESCE(c.descricao, '')             AS categoria
    FROM livro l
    LEFT JOIN categoria c ON c.id = l.id_categoria
    WHERE c.descricao ILIKE $1
    ORDER BY l.titulo;
  `;

  try {
    const { rows } = await pool.query(sql, [like]);
    return res.json(rows);
  } catch (err) {
    console.error('Erro ao buscar livros filtrados:', err);
    return res.status(500).json({ error: 'Erro ao buscar livros' });
  }
});

