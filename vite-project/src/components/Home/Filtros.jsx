import React from 'react';


export function Filtros() {
  return (
      <div className="flex flex-col gap-6 w-full h-[20rem] items-center">
        <h1 className='text-6xl'>Filtros</h1>
        <div className='grid grid-cols-3 grid-rows-1 gap-12'>
            <div className='flex justify-center items-center w-[15rem] h-[4rem] p-2 rounded-2xl shadow-2xl'><span><strong>Autor</strong></span></div>
            <div className='flex justify-center items-center w-[15rem] h-[4rem] p-2 rounded-2xl shadow-2xl'><span><strong>Categoria</strong></span></div>
            <div className='flex justify-center items-center w-[15rem] h-[4rem] p-2 rounded-2xl shadow-2xl'><span><strong>Título</strong></span></div>
        </div>
    </div>
  );
}