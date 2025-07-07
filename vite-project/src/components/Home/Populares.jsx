import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from 'react';
import loadingGif from "../../images/loading.gif";
import axios from 'axios';

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
      {dados.map((item) => (
        <div
          key={item.id}
          className="flex flex-col justify-between w-[14rem] h-[29rem] p-4 rounded-2xl bg-neutral-100 shadow-lg"
          onClick={()=>console.log("a")}
        >
          <img src={item.caminho_imagem} alt="Capa do livro" className="mb-4 w-[12rem] h-[16rem]" />
          <article className="flex flex-col flex-1 text-start">
            <h2 className="text-sm font-bold mb-2">{item.titulo}</h2>
            <span className="text-sm mb-1">Autor: {item.autor}</span>
            <span className="text-sm">Ano: {item.ano}</span>
          </article>
        </div>
      ))}
      {dados.length === 0 && !loading && (
        <p className="text-gray-500">Nenhum livro encontrado.</p>
      )}
    </div>
        </div>
      </main>
    </div>
  );
}
