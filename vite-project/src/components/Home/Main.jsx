import React, { useEffect, useState } from 'react';
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import loadingGif from "../../images/loading.gif";
import { useNavigate } from 'react-router-dom';
import { BookCover } from '../BookCover';

export function Main({ dados, setDados, loading, error }) {
  const navigtate = useNavigate();

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
        {/* Livros + botões */}
        <div className="relative w-full max-w-7xl flex items-center justify-center">

          {/* Grid com 5 colunas (ajuste pra 4x2 se quiser) */}
          <div className="grid grid-cols-5 gap-6 px-12 py-4">
            {dados.length > 0 ? dados.map(item => (
              <div
                key={item.id}
                className="flex flex-col justify-between w-[14rem] h-[29rem] p-4 rounded-2xl bg-neutral-100 shadow-lg cursor-pointer"
                onClick={() => navigtate(`detalhes/${item.id}`)}
              >
                <BookCover isbn={item.isbn} alt={`Capa de ${item.titulo}`} />   
                <article className="flex flex-col flex-1 text-start">
                  <h2 className="text-lg font-bold mb-2">{item.titulo}</h2>
                  <span className="text-sm mb-1">Autor: {item.autor}</span>
                  <span className="text-sm">Ano: {item.ano}</span>
                </article>
              </div>
            )) : (
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
