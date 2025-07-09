import React, { useState, useEffect } from 'react';
import { Article } from "../components/Home/Article"
import { Main } from "../components/Home/Main"
import { Populares } from "../components/Home/Populares"
import { Filtros } from "../components/Home/Filtros"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



export function Home() {
  const [dados, setDados] = useState([])
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handlePesquisa = async (e) => {
    if(!e == ""){
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
      }
    }};

    useEffect(() => {
      const fetchLivros = async () => {
        setLoading(true);
        try {
          const { data } = await axios.get(
            "http://localhost:5000/api/select",
            { params: { table: "livro" } }
          );
          // ajuste aqui se precisar acessar data.livros em vez de data
          console.log("data")
          console.log(data)
          console.log("data")
          setDados(Array.isArray(data) ? data : data.livros || []);
        } catch (err) {
          console.error("Erro ao buscar livros:", err);
          setError(err);
        } finally {
          setLoading(false);
        }
      };
      fetchLivros();
    }, []);

  return (
    <div className='flex flex-wrap overflow-hidden justify-center text-center items-center w-screen h-full bg-white p-12'>
      <Article handlePesquisa={handlePesquisa}></Article>
      <Main dados={dados} loading={loading} error={error}></Main>
      <Populares></Populares>
    </div>
  );
}