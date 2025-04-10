import React, { useState } from "react"
import Logo from "../../public/Logo.svg"
import ReinaldoChat from "../../public/ReinaldoChat.svg"
import User from "../../public/User.svg"
import UTFPR from "../../public/UTFPR.svg"
import SpeechBaloon from "../../public/SpeechBaloon.svg"

export function Header() {
    const [modalChat, setModalChat] = useState(false)

  return (
    <div className="absolute z-50">
      {/* Cabeçalho/menu que aparece em todas as páginas */}
      <header className='flex flex-wrap justify-between px-16 py-4 w-[99vw] h-1/6 bg-neutral-300'>
        <div className="flex flex-row gap-12">
            <img width={160} src={Logo} alt="Logo"/>
            <img width={360} src={UTFPR} alt="UTFPR" />
        </div>
        <button className="cursor-pointer">
          <img src={User} alt="User" />
        </button> 
      </header>
      <button onClick={()=> {setModalChat(!modalChat)}} className="cursor-pointer absolute -mt-[2.3rem] z-50">
        <img width={110} src={ReinaldoChat} alt="ReinaldoChat" />
      </button>
      {modalChat && (
  <div
    className="ml-12 w-[30vw] h-[120px] bg-no-repeat bg-contain bg-center flex items-center justify-center text-center"
    style={{ backgroundImage: `url(${SpeechBaloon})` }}
  >
    <p className="text-black text-sm">Olá! Eu sou o guaxinim 😄</p>
  </div>
)}
    </div>
  );
}
