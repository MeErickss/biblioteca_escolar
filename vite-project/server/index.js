import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import recommendationRouter from './recommendation.js';

dotenv.config();
const app = express();

// 1) JSON middleware
app.use(express.json());

// 2) CORS: permita tanto o 3000 (opcional) quanto o 5173
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:5173'
  ],
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization']
}));

// 3) Rotas
app.use('/api/recommendation', recommendationRouter);

// 4) Start
app.listen(4000, () => console.log('Server rodando na porta 4000'));
