import React from 'react';
import { Article } from "../components/Home/Article"
import { Main } from "../components/Home/Main"
import { Populares } from "../components/Home/Populares"
import { Filtros } from "../components/Home/Filtros"

export function ResultadoPesquisa() {
  return (
    <div className='flex flex-wrap overflow-hidden justify-center text-center items-center w-screen h-full bg-white p-12'>
        <div className='flex flex-wrap flex-row w-screen h-screen '>
            <button className='w-[10rem] h-19 bg-yellow-400'>Voltar</button>
            <input className='w-[10rem] h-19 bg-neutral-300' type="text" />
        </div>

        <Filtros></Filtros>

        <div>
            <h1>Resultados:</h1>
            <Populares></Populares>
        </div>
    </div>
  );
}