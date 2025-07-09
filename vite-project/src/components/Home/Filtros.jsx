// Filtros.jsx
import React, { useState } from 'react';

export function Filtros({ filtros, setFiltro  }) {

  const handleClick = (e) => {
    const categoria = e.currentTarget.innerText.trim().toLowerCase();
    setFiltro(categoria)
  }

  return (
    <div className="flex flex-col gap-6 w-full h-[20rem] justify-center items-center">
      <h1 className='text-6xl'>Curso</h1>
      <div className='grid grid-cols-3 gap-12 text-center'>
        {filtros.map(texto => (
          <div
            key={texto}
            onClick={(e) => handleClick(e)}
            className='flex justify-center items-center w-[15rem] h-[4rem] p-2 rounded-2xl shadow-2xl cursor-pointer'
          >
            <strong>{texto}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}
