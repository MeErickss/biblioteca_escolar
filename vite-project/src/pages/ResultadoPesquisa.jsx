import { Populares } from "../components/Home/Populares"
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from "react";
import axios from "axios";


export function ResultadoPesquisa() {
  const { pesquisa } = useParams();
  const [dados, setDados] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlePesquisa = async (e) => {
    if(e == ""){ e = pesquisa } else{
          try {
      const { data } = await axios.get(
        "http://localhost:5000/api/pesquisa",
        { params: { pesquisa: e, table:"livro" } }
      );
      // ajuste aqui se precisar acessar data.livros em vez de data
      setDados(Array.isArray(data) ? data : data.livros || []);
      } catch (err) {
        console.error("Erro ao buscar livros:", err);
        setError(err);
      } finally {
        setLoading(false);
        navigate(`/pesquisa/${e}`)
      }
    }};

  return (
    <div className='flex flex-wrap overflow-hidden justify-center text-center items-center w-screen h-full bg-white py-50'>
          <div className='flex flex-row w-full justify-center items-center h-50 gap-1'>
            <button onClick={()=> navigate("/")} className='w-[8rem] h-19 bg-yellow-400 rounded-2xl'><ArrowLeftOutlined /> Voltar</button>
            <input onChange={(e) => handlePesquisa(e.target.value)} className='w-[40rem] h-19 bg-neutral-300 rounded-2xl px-2 text-2xl' defaultValue={pesquisa} type="text" />
          </div>
          <div>
              <h1>Resultados:</h1>
              <div className="grid grid-cols-5 gap-6 px-12 py-4">
            {dados.length > 0 ? dados.map(item => (
              <div
                key={item.id}
                className="flex flex-col justify-between w-[14rem] h-[29rem] p-4 rounded-2xl bg-neutral-100 shadow-lg cursor-pointer"
                onClick={() => console.log("clicou em", item.titulo)}
              >
                <img
                  src={`https://covers.openlibrary.org/b/isbn/${item.isbn}-M.jpg`}
                  alt={`Capa de ${item.titulo}`}
                  className="mb-4 w-[12rem] h-[16rem] object-cover"
                  onError={e => {
                    e.currentTarget.src = "/capa-placeholder.png";
                  }}
                />
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
    </div>
  );
}