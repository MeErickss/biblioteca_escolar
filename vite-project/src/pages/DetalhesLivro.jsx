import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import axios from 'axios';
import loadingGif from '../images/loading.gif';

export function DetalhesLivro() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [livro, setLivro] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchDetalhes() {
      try {
        setLoading(true);
        // dados do livro
        const resp = await axios.get(`http://localhost:5000/api/livro/${id}`);
        setLivro(resp.data);
        // livros relacionados (mesma categoria)
        const rel = await axios.get(`http://localhost:5000/api/select`, {
          params: { table:"livro" }
        });
        console.log(rel.data)
        // filtra excluindo o atual e pega até 6
        setRelated(rel.data.filter(b => b.id !== resp.data.id).slice(0, 6));
      } catch (err) {
        console.error(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    fetchDetalhes();
  }, [id]);

  if (loading) return <div className="flex justify-center items-center h-screen"><img src={loadingGif} alt="Carregando..."/></div>;
  if (error)   return <div className="text-red-500 text-center p-4">Erro ao carregar dados.</div>;

  return (
    <div className="w-screen min-h-screen bg-white">
      <div className="px-12 pt-8">
        <button onClick={() => navigate(-1)} className="bg-yellow-400 text-white px-4 py-2 rounded-lg mb-6">
          <LeftOutlined /> Voltar
        </button>
        <div className="max-w-5xl mx-auto grid grid-cols-2 gap-12 items-start">
          {/* Capa */}
          <img src={livro.caminho_imagem} alt={livro.titulo} className="w-full h-auto object-cover rounded-lg shadow" />

          {/* Detalhes */}
          <div className="space-y-4">
            <h1 className="text-4xl font-bold">{livro.titulo}</h1>
            <p><strong>Autor:</strong> {livro.autor}</p>
            <p><strong>Páginas:</strong> {livro.paginas || '—'}</p>
            <p><strong>ISBN:</strong> {livro.isbn}</p>
            <p className="mt-4 text-gray-700 leading-relaxed">{livro.descricao}</p>
            <p><strong>Unidades disponíveis:</strong> {livro.estoque}</p>
          </div>
        </div>

        {/* Relacionados */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-semibold mb-4">Relacionados</h2>
            <div className="relative">
              <button className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 bg-white rounded-full shadow">
                <LeftOutlined />
              </button>
              <div className="flex space-x-6 overflow-x-auto px-12">
                {related.map(item => (
                  <div key={item.id} className="flex-shrink-0 w-40">
                    <img
                      src={item.caminho_imagem}
                      alt={item.titulo}
                      className="w-full h-56 object-cover rounded-lg mb-2 cursor-pointer"
                      onClick={() => navigate(`/livro/${item.id}`)}
                    />
                    <h3 className="text-sm font-medium text-center">{item.titulo}</h3>
                  </div>
                ))}
              </div>
              <button className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 bg-white rounded-full shadow">
                <RightOutlined />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}