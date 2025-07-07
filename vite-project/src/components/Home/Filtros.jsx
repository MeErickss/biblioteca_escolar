import React from 'react';
import { useNavigate } from 'react-router-dom';

export function Filtros({ filtros }) {
  const navigate = useNavigate();

  const handleClick = (e) => {
    const filtro = e.currentTarget.innerText.trim().toLowerCase();
    navigate(`/filtro/${filtro}`);
  }

  return (
    <div className="flex flex-col gap-6 w-full h-[20rem] justify-center items-center">
      <h1 className='text-6xl'>Filtros</h1>
      <div className='grid grid-cols-3 gap-12 text-center'>
        {filtros.map(texto => (
          <div
            key={texto}
            onClick={handleClick}
            className='flex justify-center items-center w-[15rem] h-[4rem] p-2 rounded-2xl shadow-2xl cursor-pointer'
          >
            <span><strong>{texto}</strong></span>
          </div>
        ))}
      </div>
    </div>
  );
}
