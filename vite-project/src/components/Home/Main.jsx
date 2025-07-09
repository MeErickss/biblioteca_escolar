import React from 'react';
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import loadingGif from "../../images/loading.gif";
import { useNavigate } from 'react-router-dom';
import { BookCover } from '../BookCover';

export function Main({ dados, setDados, loading, error }) {
  const navigate = useNavigate();

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
    <div className="w-screen min-h-screen bg-white">
      <main className="px-4 py-6 flex flex-col items-center gap-10">
        <div className="relative w-full max-w-7xl flex items-center justify-center">
          <div className="grid grid-cols-5 gap-6 px-12 py-4">
            {dados.length > 0 ? (
              dados.map((item, idx) => (
                <div
                  key={`${item.isbn}-${idx}`}
                  className='flex flex-col justify-between p-4 bg-neutral-100 rounded-2xl shadow-lg cursor-pointer'
                  onClick={() => navigate(`/livro/${item.id}`)}
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
          </div>
        </div>
      </main>
    </div>
  );
}
