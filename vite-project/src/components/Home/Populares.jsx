import React from 'react';
import { Books } from "../Books";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

export function Populares() {
  return (
    <div className='w-screen min-h-screen bg-white'>
      <main className='px-4 py-6 flex flex-col items-center gap-10'>
        <h1 className='text-5xl'><strong>POPULARES</strong></h1>
        {/* Livros + botões centralizados verticalmente */}
        <div className='relative w-full max-w-7xl flex items-center justify-center'>

          {/* Botão Esquerdo */}
          <button className='absolute left-0 z-10 p-3 rounded-full text-black'>
            <LeftOutlined />
          </button>

          {/* Grid com 2 linhas e 4 colunas */}
          <div className='grid grid-cols-5 grid-rows-2 gap-6 px-12 py-4'>
            {Array.from({ length: 10 }).map((_, index) => (
              <div key={index}>
                <Books autor={"JKROLLING"} genero={"Ficção"} nome={`Harry Potter ${index + 1}`} />
              </div>
            ))}
          </div>

          {/* Botão Direito */}
          <button className='absolute right-0 z-10 p-3 rounded-full text-black'>
            <RightOutlined />
          </button>
        </div>

        {/* Barra de progresso */}
        <div className="relative h-2 bg-gray-300 rounded overflow-hidden w-1/2 mt-4">
          <div className="absolute top-0 left-0 h-full w-1/4 bg-yellow-500"></div>
        </div>

      </main>
    </div>
  );
}
