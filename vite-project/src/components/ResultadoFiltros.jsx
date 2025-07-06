import React, { useEffect, useState } from 'react';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import loadingGif from '../images/loading.gif';
import reinaldo from '../images/reinaldo.svg'
import axios from 'axios';

export function ResultadoFiltros({ tipo = '' }) {
  const [dados, setDados] = useState([]);
  const [term, setTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Título capitalizado com fallback
  const displayType = tipo
    ? tipo.charAt(0).toUpperCase() + tipo.slice(1)
    : '';

  const fetchLivros = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/api/filter/${tipo}`, {
        params: { term }
      });
      setDados(response.data);
    } catch (err) {
      console.error('Erro ao buscar livros:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Quando o tipo muda, limpa termo e dados, e faz chamada inicial
    setTerm('');
    setDados([]);
    if (tipo) fetchLivros();
  }, [tipo]);

  if (!tipo) {
    return (
      <div className='text-center text-gray-500'>
        <img src={reinaldo}/>
      </div>
    );
  }

  if (loading) {
    return (
      <div className='flex justify-center items-center w-full'>
        <img src={loadingGif} alt='Carregando...' />
      </div>
    );
  }

  if (error) {
    return (
      <div className='text-red-500 text-center mt-4'>
        <p>Ocorreu um erro ao carregar os livros. Tente novamente mais tarde.</p>
      </div>
    );
  }

  return (
    <div className='w-full max-w-5xl'>
      <h1 className='text-3xl font-bold mb-4'>Resultados: {displayType}</h1>

      {/* Campo de busca */}
      <div className='flex gap-2 mb-6'>
        <input
          type='text'
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          className='border border-gray-300 rounded px-3 py-1 flex-1'
          placeholder={`Pesquisar por ${tipo}...`}
        />
        <button onClick={fetchLivros} className='bg-yellow-500 text-white px-4 py-1 rounded'>Buscar</button>
      </div>

      {/* Grid de resultados com botões de navegação */}
      <div className='relative'>
        <button className='absolute left-0 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-white shadow'>
          <LeftOutlined />
        </button>
        <div className='grid grid-cols-4 gap-6'>
          {dados.length > 0 ? (
            dados.map(item => (
              <div
                key={item.id}
                className='flex flex-col justify-between p-4 bg-neutral-100 rounded-2xl shadow-lg cursor-pointer'
              >
                <img
                  src={item.caminho_imagem}
                  alt={item.titulo}
                  className='w-full h-64 object-cover mb-4 rounded'
                />
                <h2 className='text-lg font-bold'>{item.titulo}</h2>
                <p className='text-sm'>Autor: {item.autor}</p>
                <p className='text-sm'>Ano: {item.ano}</p>
              </div>
            ))
          ) : (
            <p className='col-span-4 text-center text-gray-500'>Nenhum livro encontrado.</p>
          )}
        </div>
        <button className='absolute right-0 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-white shadow'>
          <RightOutlined />
        </button>
      </div>
    </div>
  );
}