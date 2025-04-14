import React from 'react';


export function Populares() {
  return (
      <div className="flex flex-col gap-6 w-full items-center">
      <h1 className="text-4xl font-bold">Populares</h1>

      <div className="relative w-1/2">
        <button
          className="absolute left-[-2rem] top-1/2 -translate-y-1/2 p-2 z-10 bg-transparent"
        >
          &lt;
        </button>

        <div className="grid grid-cols-5 grid-rows-2 gap-10 text-center">
          <div>livro</div>
          <div>livro</div>
          <div>livro</div>
          <div>livro</div>
          <div>livro</div>
          <div>livro</div>
          <div>livro</div>
          <div>livro</div>
          <div>livro</div>
          <div>livro</div>
        </div>

        <button
          className="absolute right-[-2rem] top-1/2 -translate-y-1/2 p-2 z-10 bg-transparent"
        >
          &gt;
        </button>
      </div>

      <div className="relative h-2 bg-gray-300 rounded overflow-hidden w-1/2">
        <div className="absolute top-0 left-0 h-full w-1/4 bg-yellow-500"></div>
      </div>
    </div>
  );
}