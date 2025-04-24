import React from 'react';
import { Books } from "../Books";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

export function Main() {
  return (
    <div className='w-screen min-h-screen bg-white'>
      <main className='px-4 py-6 flex flex-col items-center gap-10'>

        {/* Linha dos gêneros */}
        <div className='grid grid-cols-7 gap-6 w-full max-w-6xl text-lg font-semibold'>
          <h2 className='col-span-1'>Romance</h2>
          <span>Computação</span>
          <span>Química</span>
          <span>Física</span>
          <span>História</span>
          <span>Geografia</span>
          <span>Outro</span>
        </div>

        {/* Livros + botões centralizados verticalmente */}
        <div className='relative w-full max-w-7xl flex items-center justify-center'>

          {/* Botão Esquerdo */}
          <button className='absolute left-0 top-50 p-3 bg-transparent text-black'>
            <LeftOutlined />
          </button>

          {/* Grid com 2 linhas e 4 colunas */}
          <div className='grid grid-cols-5 grid-rows-1 gap-6 px-12 py-4'>
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index}>
                <Books autor={"JKROLLING"} genero={"Ficção"} nome={`Harry Potter ${index + 1}`} />
              </div>
            ))}
          </div>

          {/* Botão Direito */}
          <button className='absolute right-0 top-50 p-3 bg-transparent text-black'>
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
