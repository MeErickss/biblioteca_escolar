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



app.get('/api/select', async (req, res) => {
  const map = {
    autor:"SELECT * FROM autor;",
    cargo:"SELECT * FROM cargo;",
    categoria:"SELECT * FROM categoria;",
    curso:"SELECT * FROM curso;",
    divida:"SELECT * FROM divida;",
    editora:"SELECT * FROM editora;",
    emprestimo:"SELECT * FROM emprestimo;",
    livro:"SELECT * FROM livro;",
    locatorio:"SELECT * FROM locatorio;",
    subcategoria:"SELECT * FROM subcategoria;"
  }

    let client;
    const { table } = req.query
    try {
      client = await pool.connect();
      const result = await client.query(map[table]);
      
      // Retorna os resultados como JSON
      res.json(result.rows);
      
    } catch (err) {
      console.error('Erro ao buscar cargos:', err);
      res.status(500).json({
        success: false,
        error: 'Erro ao buscar cargos no banco de dados'
      });
      
    } finally {
      if (client) client.release(); // Libera a conexão de volta para o pool
    }
});


app.post('/api/insert', async (req, res) => {
  const map = {
    autor:"INSERT INTO autor VALUES ($1, $2);",
    cargo:"INSERT INTO cargo VALUES ($1, $2);",
    categoria:"INSERT INTO categoria VALUES ($1, $2);",
    curso:"INSERT INTO curso VALUES ($1, $2);",
    divida:"INSERT INTO divida VALUES ($1, $2);",
    editora:"INSERT INTO editora VALUES ($1, $2);",
    emprestimo:"INSERT INTO emprestimo VALUES ($1, $2);",
    livro:"INSERT INTO livro VALUES ($1, $2);",
    locatorio:"INSERT INTO locatorio VALUES ($1, $2);",
    subcategoria:"INSERT INTO subcategoria VALUES ($1, $2);"
  }

  const { login, senha, table } = req.body;
  console.log(login, senha , table)
  let client;

  try {
    client = await pool.connect();

    const sqlText = map[table];


    await client.query(sqlText, [login, senha]);


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
  const map = {
    autor:"UPDATE autor SET ativo = false WHERE id = $1",
    cargo:"UPDATE cargo SET ativo = false WHERE id = $1;",
    categoria:"UPDATE categoria SET ativo = false WHERE id = $1;",
    curso:"UPDATE curso SET ativo = false WHERE id = $1;",
    divida:"UPDATE divida SET ativo = false WHERE id = $1;",
    editora:"UPDATE editora SET ativo = false WHERE id = $1;",
    emprestimo:"UPDATE emprestimo SET ativo = false WHERE id = $1;",
    livro:"UPDATE livro SET ativo = false WHERE id = $1;",
    locatorio:"UPDATE locatorio SET ativo = false WHERE id = $1;",
    subcategoria:"UPDATE subcategoria SET ativo = false WHERE id = $1;"
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