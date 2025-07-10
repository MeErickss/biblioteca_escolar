// src/components/Reinaldo.tsx

import React, { useState } from 'react';
import ReinaldoChat from '../../images/ReinaldoChat.svg';
import './Reinaldo.css';

export function Reinaldo() {
  const [modalChat, setModalChat] = useState(false);
  const [input, setInput]         = useState('');
  const [response, setResponse]   = useState('');
  const [text, setText]           = useState('Olá, eu sou o Reinaldo, como posso te ajudar? 🦝');

  const handleSubmit = async () => {
    if (!input.trim()) return;
    setText('Carregando recomendações…');
    try {
      const res = await fetch('http://localhost:4000/api/recommendation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: `Alguns livros com o tema que você escolheu 🦝: ${input}` }),
      });
      const body = await res.json();
      if (res.ok) {
        setResponse(body.recommendation);
        setText('');
      } else {
        console.error(body);
        setText('Desculpe, não consegui buscar recomendações.');
      }
    } catch (err) {
      console.error(err);
      setText('Erro de rede ao buscar recomendações.');
    }
  };

  return (
    <>
      <button
        onClick={() => {
          setModalChat(!modalChat);
          setInput('');
          setResponse('');
          setText('Olá, eu sou o Reinaldo, como posso te ajudar? 🦝');
        }}
        className="cursor-pointer absolute -mt-[2.3rem] z-50"
      >
        <img className='-mt-[2.4rem]' width={110} src={ReinaldoChat} alt="ReinaldoChat" />
      </button>
      {modalChat && (
        <div className="ml-10 mt-2">
          <div className="bubble">
            <span>{text}</span>
            <div className="flex flex-wrap gap-2 w-full">
              <input
                type="text"
                placeholder="Digite um gênero ou tema"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="min-w-8/12 max-w-full py-2 rounded focus:outline-none border-b-2 border-black border-dotted"
              />
              <button
                onClick={handleSubmit}
                className="w-22 cursor-pointer text-sm bg-transparent border-2 border-black text-black py-2 rounded"
              >
                Recomendar
              </button>
            </div>
            <p className="mt-4">{response}</p>
          </div>
        </div>
      )}
    </>
  );
}
