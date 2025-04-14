import React from 'react';
import { Article } from "../components/Home/Article"
import { Main } from "../components/Home/Main"
import { Populares } from "../components/Home/Populares"


export function Home() {
  return (
    <div className='flex flex-wrap justify-center text-center items-center w-screen h-screen bg-white p-12 gap-52'>
      <Article></Article>
      <Main></Main>
      <Populares></Populares>
    </div>
  );
}