import { useEffect, useState } from "react";
import Livro from "./Livro.svg";
import loadingGif from "../images/loading.gif";
import axios from "axios";

export function Books({ limit = 2 }) {
  const [dados, setDados] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLivros = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5000/api/livros");
        setDados(response.data);
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

  const livrosVisiveis = dados.slice(0, limit);

  return (
    <div className="flex flex-wrap p-2 gap-6 justify-center">
      {livrosVisiveis.map((item) => (
        <div
          key={item.id}
          className="flex flex-col justify-between w-[14rem] h-[29rem] p-4 rounded-2xl bg-neutral-100 shadow-lg"
        >
          <img src={item.url_capa || Livro} alt="Capa do livro" className="mb-4" />
          <article className="flex flex-col flex-1 text-start">
            <h2 className="text-lg font-bold mb-2">{item.titulo}</h2>
            <span className="text-sm mb-1">Autor: {item.autor}</span>
            <span className="text-sm">Ano: {item.ano}</span>
          </article>
          <button className="mt-4 w-full h-10 rounded-lg text-white shadow-lg bg-yellow-500 hover:bg-yellow-600">
            <strong>VER MAIS</strong>
          </button>
        </div>
      ))}
      {dados.length === 0 && !loading && (
        <p className="text-gray-500">Nenhum livro encontrado.</p>
      )}
    </div>
  );
}
