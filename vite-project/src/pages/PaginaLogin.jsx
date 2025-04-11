import React, { useEffect, useState } from 'react';
import Ellipse1 from ".././images/Ellipse1.svg"
import Ellipse2 from ".././images/Ellipse2.svg"
import Ellipse3 from ".././images/Ellipse3.svg"


export function PaginaLogin() {
  return (
    <div className="flex flex-wrap justify-center items-center w-screen h-screen bg-white">
      <img className="fixed top-[2rem] right-[2rem]" src={Ellipse1} />
      <img className="fixed bottom-[7rem] left-[0rem]" src={Ellipse2} />
      <img className="fixed bottom-[-22rem] right-[2rem]" src={Ellipse3} />
        <div className="flex flex-wrap flex-col gap-18 justify-center items-center text-center w-4/12 h-9/12 rounded-2xl bg-neutral-50 opacity-75">
            <header className='w-full text-5xl'><strong>Bibliotecário</strong></header>
            <main>
              <div className='flex flex-col w-full gap-6'>
                <input className='w-96 border-2 border-gray-400 rounded-sm focus:outline-0 p-3 px-4' placeholder='Login' type="text" />
                <input className='w-96 border-2 border-gray-400 rounded-sm focus:outline-0 p-3 px-4' placeholder='Senha' type="text" />
                <button className='cursor-pointer w-30 h-5 self-end text-sm hover:text-blue-600 hover:border-b-2'>Esqueceu a senha?</button>
              </div>
            </main>
            <button className='cursor-pointer w-96 h-14 bg-yellow-500 rounded-sm text-2xl'>Entrar</button>
        </div>
    </div>
  );
}