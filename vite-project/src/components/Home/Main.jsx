import React from 'react';



export function Main() {
  return (
    <div className='w-screen h-96'>
      <main className='w-screen px-2 flex flex-wrap justify-center items-center'>
        <div className='grid grid-rows-2 grid-cols-8 gap-12 text-start'>
          <h2 className='col-span-3'>Romance</h2>
          <span>Computação</span>
          <span>Química</span>
          <span>Física</span>
          <span>História</span>
          <span>Geografia</span>

          <button className='bg-red-500'>voltar</button>
          <div>livro1</div>
          <div>livro2</div>
          <div>livro3</div>
          <div>livro4</div>
          <div>livro5</div>
          <div>livro6</div>
          <button className='bg-red-500'>ir</button>
          <button>slider</button>
        </div>
        <div className='flex flex-wrap w-full justify-center items-center gap-12'>
          <h1 className='text-4xl w-full'><strong>Filtros</strong></h1>
          <div className='grid grid-cols-3 grid-rows-1 w-1/2'>
            <div>Autor</div>
            <div>Categoria</div>
            <div>Título</div>
          </div>
        </div>
      </main>
    </div>
  );
}