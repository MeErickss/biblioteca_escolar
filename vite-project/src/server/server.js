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

const PORT = process.env.PORT || 5000; // Fallback para 5000 se PORT não estiver definido

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Banco de dados configurado: ${process.env.DATABASE_URL?.split('@')[1]?.split('/')[0] || 'URL não disponível'}`);
});

app.get('/api/select', async (req, res) => {
  const map = {
    locatorio:"SELECT * FROM locatorio",
    livros:"SELECT * FROM locatorio"
  }
    let client;
    const { table } = req.body
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
    autor:"INSERT INTO autor (nome, senha) VALUES ($1, $2);"
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
    autor:"UPDATE autor SET ativo = false WHERE nome = $1"
  }

  const { table, nome } = req.body;
  let client;

  try {
    client = await pool.connect();

    const sqlText = map[table];


    await client.query(sqlText, [nome]);


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
