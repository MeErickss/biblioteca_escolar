import React from 'react';
import { Filtros } from "../components/Home/Filtros"
import { ArrowLeftOutlined } from '@ant-design/icons';
import { ResultadoFiltros } from '../components/ResultadoFiltros';

export function PesquisaFiltro() {
  return (
    <div className='flex flex-wrap overflow-hidden justify-center text-center items-center w-screen h-full bg-white py-50'>
          <div className='flex flex-row w-full justify-start items-center h-50 gap-1'>
            <button className='w-[12rem] h-20 bg-yellow-400 ml-[12rem] rounded-2xl'><ArrowLeftOutlined /> Voltar</button>
          </div>
          <Filtros/>
          <div className='flex p-12 rounded-2xl justify-center items-center bg-neutral-300 '>
              <ResultadoFiltros/>
          </div>
    </div>
  );
}