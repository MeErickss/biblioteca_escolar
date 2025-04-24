import React from 'react';
import { Article } from "../components/Home/Article"
import { Main } from "../components/Home/Main"
import { Populares } from "../components/Home/Populares"
import { Filtros } from "../components/Home/Filtros"

export function Home() {
  return (
    <div className='flex flex-wrap overflow-hidden justify-center text-center items-center w-screen h-full bg-white p-12'>
      <Article></Article>
      <Main></Main>
      <Filtros></Filtros>
      <Populares></Populares>
    </div>
  );
}