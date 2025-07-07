// PesquisaFiltro.jsx
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Filtros } from '../components/Home/Filtros';
import { ResultadoFiltros } from '../components/ResultadoFiltros';

export function PesquisaFiltro() {
  const navigate = useNavigate();
  const { categoria } = useParams();  // agora "categoria" é o nome: psicologia, medicina...

  return (
    <div className='flex flex-wrap justify-center items-start w-screen min-h-screen bg-white py-8'>
      <div className='w-full flex justify-start px-12 mb-6'>
        <button onClick={() => navigate('/')} 
                className='flex items-center gap-2 bg-yellow-400 text-black px-4 py-2 rounded-2xl'>
          <ArrowLeftOutlined /> Voltar
        </button>
      </div>

      {/* Se não tiver categoria na URL, mostra apenas os filtros */}
      {!categoria && <Filtros filtros={["Psicologia", "Medicina", "Arquitetura"]} />}

      {/* Se tiver categoria, mostra os resultados */}
      {categoria && (
        <div className='w-full flex justify-center px-12 mt-8'>
          <ResultadoFiltros categoria={categoria} />
        </div>
      )}
    </div>
  );
}
