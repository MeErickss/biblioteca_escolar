import React from 'react';
import { Article } from "../components/Home/Article"
import { Main } from "../components/Home/Main"
import { Populares } from "../components/Home/Populares"
import { Filtros } from "../components/Home/Filtros"
import { ArrowLeftOutlined } from '@ant-design/icons';

export function ResultadoPesquisa() {
  return (
    <div className='flex flex-wrap overflow-hidden justify-center text-center items-center w-screen h-full bg-white py-50'>
          <div className='flex flex-row w-full justify-center items-center h-50 gap-1'>
            <button className='w-[8rem] h-19 bg-yellow-400 rounded-2xl'><ArrowLeftOutlined /> Voltar</button>
            <input className='w-[40rem] h-19 bg-neutral-300 rounded-2xl px-2 text-2xl' type="text" />
          </div>
          <Filtros></Filtros>
          <div>
              <h1>Resultados:</h1>
              <Populares></Populares>
          </div>
    </div>
  );
}