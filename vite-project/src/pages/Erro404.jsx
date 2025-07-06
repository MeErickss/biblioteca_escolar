import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import error from "../images/Group16.svg"


export function Erro404() {
  const navigate = useNavigate();


  return (
    <div className='flex flex-col justify-center text-center items-center w-screen h-full bg-white pt-8'>
        <div className='flex flex-row justify-center items-center p-12'>
          <span className='text-[12rem] text-neutral-300 -mb-20'>404</span>
          <img src={error} alt="" />
        </div>
        <div className='w-full h-full bg-neutral-300 p-12'>
          <p className='text-7xl h-30 text-neutral-500'>Desculpe, página não encontrada</p>
          <p className='text-2xl h-12 text-neutral-500'>A página solicitada não pôde ser encontrada</p>
          <button onClick={()=>{navigate("/")}} className='text-white bg-neutral-600 rounded-full p-2 w-68 h-12'>VOLTO PARA CASA</button>
        </div>
    </div>
  );
}