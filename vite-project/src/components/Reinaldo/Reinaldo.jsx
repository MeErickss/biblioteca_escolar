import React, { useState } from "react";
import ReinaldoChat from "../../images/ReinaldoChat.svg";
import "./Reinaldo.css";

// Função que chama o endpoint do seu servidor Express
async function getBookRecommendation(prompt) {
  const res = await fetch('http://localhost:5000/api/recommend', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt }),
  });

  // Faz parse do JSON uma única vez
  let data;
  try {
    data = await res.json();
  } catch (e) {
    throw new Error('Resposta inválida do servidor.');
  }

  if (!res.ok) {
    throw new Error(data.error || 'Erro desconhecido ao recomendar livros');
  }

  // Retorna o texto gerado
  return data.generated_text;
}

export function Reinaldo() {
  const [modalChat, setModalChat] = useState(false);
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [text, setText] = useState(
    "Olá, eu sou o Reinaldo, como posso te ajudar? 🦝"
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    if (!input) return;
    setLoading(true);
    setError(null);
    try {
      const result = await getBookRecommendation(
        `Alguns livros com o tema que você escolheu 🦝: ${input}`
      );
      setResponse(result);
      setText("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = () => {
    setModalChat((prev) => !prev);
    setInput("");
    setResponse("");
    setText("Olá, eu sou o Reinaldo, como posso te ajudar? 🦝");
    setError(null);
  };

  return (
    <>
      <button
        onClick={handleToggle}
        className="cursor-pointer absolute w-1/2 z-50"
      >
        <img
          width={110}
          src={ReinaldoChat}
          className="-mt-[2.34rem]"
          alt="ReinaldoChat"
        />
      </button>

      {modalChat && (
        <div className="ml-10 mt-2">
          <div className="bubble">
            <span>{text}</span>
            <div className="flex flex-wrap gap-2 w-full mt-2">
              <input
                type="text"
                placeholder="Digite um gênero ou tema"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="min-w-8/12 max-w-full py-2 rounded focus:outline-none border-b-2 border-black border-dotted"
              />
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-22 cursor-pointer text-sm bg-transparent border-2 border-black text-black py-2 hover:bg-black hover:text-white transition-colors rounded disabled:opacity-50"
              >
                {loading ? 'Recomendando...' : 'Recomendar'}
              </button>
            </div>
            {error && <p className="text-red-500 mt-2">{error}</p>}
            {response && <p className="mt-4 whitespace-pre-wrap">{response}</p>}
          </div>
        </div>
      )}
    </>
  );
}
