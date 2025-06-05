import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Importe seus componentes - verifique se você exporta como default
import { Layout } from './pages/Layout';
import { PaginaLogin } from './pages/PaginaLogin';
import { Home } from './pages/Home';
import { Erro404 } from './pages/Erro404';
import { ResultadoPesquisa } from './pages/ResultadoPesquisa';
import { Cadastro } from './pages/Cadastro';


export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          
          {/* Rota de login */}
          <Route path="login" element={<PaginaLogin />} />
          <Route path="pesquisa" element={< ResultadoPesquisa/>} />
          <Route path="cadastro" element={< Cadastro/>} />

          
          {/* Redirecionamento - agora faz sentido pois temos uma rota "/" */}
          <Route path="inicio" element={<Navigate to="/" replace />} />
          
          {/* Rota 404 */}
          <Route path="*" element={<Erro404 />} />
        </Route>
      </Routes>
    </Router>
  );
}