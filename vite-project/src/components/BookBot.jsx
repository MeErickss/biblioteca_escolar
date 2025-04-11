import React, { useState } from 'react';
import { getBookRecommendation } from '../../server/hugginface_api';

export function BookBot() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async () => {
    const result = await getBookRecommendation(`Recomende livros com o tema: ${input}`);
    setResponse(result);
  };

  return (
    <div className='absolute bg-amber-300'>
      <input
        type="text"
        placeholder="Digite um gênero ou tema"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="border p-2 rounded"
      />
      <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded ml-2">
        Recomendar
      </button>
      <p className="mt-4">{response}</p>
    </div>
  );
}