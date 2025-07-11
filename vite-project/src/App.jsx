import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Importe seus componentes - verifique se você exporta como default
import { Layout } from './pages/Layout';
import { PaginaLogin } from './pages/PaginaLogin';
import { Home } from './pages/Home';
import { Erro404 } from './pages/Erro404';
import { DetalhesLivro } from './pages/DetalhesLivro';
import { CadastroUsuario } from './pages/CadastroUsuario';
import { CadastroLivro } from './pages/CadastroLivro';
import { Historico } from './pages/Historico';
import { Cadastro } from './pages/Cadastro';


export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          
          {/* Rota de login */}
          <Route path="login" element={<PaginaLogin />} />
          <Route path="cadastro" element={< Cadastro/>} />
          <Route path="cadastrousuario" element={< CadastroUsuario/>} />
          <Route path="cadastrolivro" element={< CadastroLivro/>} />
          <Route path="livro/:id" element={< DetalhesLivro/>} />
          <Route path="historico" element={< Historico/>} />
        
          {/* Redirecionamento - agora faz sentido pois temos uma rota "/" */}
          <Route path="inicio" element={<Navigate to="/" replace />} />
          
          {/* Rota 404 */}
          <Route path="*" element={<Erro404 />} />
        </Route>
      </Routes>
    </Router>
  );
}