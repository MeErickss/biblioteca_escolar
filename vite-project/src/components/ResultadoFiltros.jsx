// ResultadoFiltros.jsx
import React, { useEffect, useState } from 'react';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import loadingGif from '../images/loading.gif';
import axios from 'axios';
import { Filtros } from './Home/Filtros';

export function ResultadoFiltros({ categoria }) {
  const [dados, setDados]     = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);

  const displayCategoria = 
    categoria.charAt(0).toUpperCase() + categoria.slice(1);

  // busca os livros da categoria
  const fetchLivros = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:5000/api/filter/categoria`,
        { params: { term: categoria } }
      );
      console.log(res.data)
      setDados(res.data);
    } catch (err) {
      console.error('Erro ao buscar livros:', err);
      setError('Falha ao carregar livros.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('fetching for categoria =', categoria);
    fetchLivros();
  }, [categoria]);  // dispara no mount e sempre que `categoria` mudar

  
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
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className='w-full max-w-5xl'>
      <Filtros filtros={["Psicologia", "Medicina", "Arquitetura"]} />
      <h1 className='text-3xl font-bold mb-4'>
        Resultados: {displayCategoria}
      </h1>

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
                <p className='text-sm'>Ano: {item.ano}</p>
                <p className='text-sm'>Categoria: {item.categoria}</p>
              </div>
            ))
          ) : (
            <p className='col-span-4 text-center text-gray-500'>
              Nenhum livro encontrado nesta categoria.
            </p>
          )}
        </div>

        <button className='absolute right-0 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-white shadow'>
          <RightOutlined />
        </button>
      </div>
    </div>
  );
}
