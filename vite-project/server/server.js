import 'dotenv/config';
import express from 'express';
import pkg from 'pg';
import cors from 'cors';

const { Pool } = pkg;
const app = express();

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

app.get('/api/cargo', async (req, res) => {
    let client;
    try {
      client = await pool.connect();
      const result = await client.query('SELECT * FROM cargo');
      
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