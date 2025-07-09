import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from 'react';
import loadingGif from "../../images/loading.gif";
import axios from 'axios';
import { BookCover } from "../BookCover";

export function Populares() {
  const [dados, setDados] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLivros = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5000/api/select",{params:{table:"livro"}});
        setDados(response.data);
        console.log(response.data)
      } catch (err) {
        console.error("Erro ao buscar livros:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLivros();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <img src={loadingGif} alt="Carregando..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center mt-4">
        <p>Ocorreu um erro ao carregar os livros. Tente novamente mais tarde.</p>
      </div>
    );
  }


  return (
    <div className='w-screen min-h-screen bg-white'>
      <main className='px-4 py-6 flex flex-col items-center gap-10'>
        <h1 className='text-5xl'><strong>POPULARES</strong></h1>
        {/* Livros + botões centralizados verticalmente */}
        <div className='relative w-full max-w-7xl flex items-center justify-center'>

          {/* Grid com 2 linhas e 4 colunas */}
          <div className='grid grid-cols-5 grid-rows-1 gap-6 px-12 py-4'>
            {dados.length > 0 ? (
              dados.map((item, idx) => (
                <div
                  key={`${item.isbn}-${idx}`}
                  className='flex flex-col justify-between p-4 bg-neutral-100 rounded-2xl shadow-lg cursor-pointer'
                  onClick={() => navigate(`/livro/${item.isbn}`)}
                >
                  {/* Passa ISBN e classe para o BookCover */}
                  <BookCover
                    isbn={item.isbn}
                    alt={`Capa de ${item.titulo}`}
                    className="w-[12rem] h-[16rem] object-cover mb-4 rounded"
                  />
                  <h2 className='text-lg font-bold'>{item.titulo}</h2>
                  <p className='text-sm'>Ano: {item.ano}</p>
                  <p className='text-sm'>Categoria: {item.categoria}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 col-span-full text-center">
                Nenhum livro encontrado.
              </p>
            )}
      {dados.length === 0 && !loading && (
        <p className="text-gray-500">Nenhum livro encontrado.</p>
      )}
    </div>
        </div>
      </main>
    </div>
  );
}
