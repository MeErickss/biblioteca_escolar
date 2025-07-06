import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Filtros } from '../components/Home/Filtros';
import { ResultadoFiltros } from '../components/ResultadoFiltros';

export function PesquisaFiltro() {
  const navigate = useNavigate();
  const { type } = useParams();

  return (
    <div className='flex flex-wrap justify-center items-start w-screen min-h-screen bg-white py-8'>
      <div className='w-full flex justify-start px-12 mb-6'>
        <button onClick={() => navigate('/')} className='flex items-center gap-2 bg-yellow-400 text-black px-4 py-2 rounded-2xl'>
          <ArrowLeftOutlined /> Voltar
        </button>
      </div>
      <Filtros filtros={['Autor', 'Titulo', 'Categoria']} />
      <div className='w-full flex justify-center px-12 mt-8'>
        {/* Passa type (pode ser undefined) ao componente */}
        <ResultadoFiltros tipo={type} />
      </div>
    </div>
  );
}