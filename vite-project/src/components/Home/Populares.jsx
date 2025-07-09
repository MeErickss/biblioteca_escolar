import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';         // 1. importe aqui
import loadingGif from '../../images/loading.gif';
import axios from 'axios';
import { BookCover } from '../BookCover';
import { Filtros } from './Filtros';

export function Populares() {
  const navigate = useNavigate();                        // 2. instancie aqui
  const [dados, setDados] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filtro, setFiltro] = useState('');

  // --- todos os efeitos aqui em cima ---
  useEffect(() => {
    const fetchLivros = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          'http://localhost:5000/api/select',
          { params: { table: 'livro' } }
        );
        setDados(data);
      } catch (err) {
        console.error('Erro ao buscar livros:', err);
        setError('Falha ao carregar livros.');
      } finally {
        setLoading(false);
      }
    };
    fetchLivros();
  }, []);

  useEffect(() => {
    // só dispara quando filtro não estiver vazio
    if (!filtro) return;

    const fetchPorCategoria = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          'http://localhost:5000/api/filter/categoria',
          { params: { term: filtro } }
        );
        setDados(data);
      } catch (err) {
        console.error('Erro ao buscar livros filtrados:', err);
        setError('Falha ao carregar livros filtrados.');
      } finally {
        setLoading(false);
      }
    };
    fetchPorCategoria();
  }, [filtro]);

  // --- agora os returns condicionais seguem SEM afetar os hooks ---
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <img src={loadingGif} alt="Carregando..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center mt-4">
        <p>{error}</p>
      </div>
    );
  }

  // --- e finalmente o render padrão ---
  return (
    <div className="w-screen min-h-screen bg-white">
      <main className="px-4 py-6 flex flex-col items-center gap-10">
        <Filtros
          setFiltro={setFiltro}
          filtros={['Psicologia', 'Medicina', 'Arquitetura']}
        />

        <div className="relative w-full max-w-7xl flex items-center justify-center">
          <div className="grid grid-cols-5 gap-6 px-12 py-4">
            {dados.length > 0 ? (
              dados.map((item, idx) => (
                <div
                  key={`${item.isbn}-${idx}`}
                  className="flex flex-col justify-between p-4 bg-neutral-100 rounded-2xl shadow-lg cursor-pointer"
                  onClick={() => navigate(`/livro/${item.isbn}`)}
                >
                  <BookCover
                    isbn={item.isbn}
                    alt={`Capa de ${item.titulo}`}
                    className="w-[12rem] h-[16rem] object-cover mb-4 rounded"
                  />
                  <h2 className="text-lg font-bold">{item.titulo}</h2>
                  <p className="text-sm">Ano: {item.ano}</p>
                  <p className="text-sm">Categoria: {item.categoria}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 col-span-full text-center">
                Nenhum livro encontrado.
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
