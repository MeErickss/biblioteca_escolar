import { useEffect, useState } from "react";
import Livro from "./Livro.svg"
import loadingGif from "../images/loading.gif"
import axios from "axios"


export function Books({nome, autor, genero}) {
  const [dados, setDados] = useState()
  const [loading, setLoading] = useState()
  const [error, setError] = useState()

  useEffect(() => {
    const fetchLivros = async() => {
      try {
        setLoading(true)                   // começar o loading
        const response = await axios.get('http://localhost:5000/api/livros')
        setDados(response.data)           // grava no state
        console.log(dados)
      } catch (err) {
        console.error('Erro ao buscar locatórios:', err)
        setError(err)                     // grava o erro
      } finally {
        setLoading(false)                 // fim do loading
      } 
    }  
    fetchLivros() 
  }),[dados]

  return (
    <div className='flex justify-between flex-wrap flex-col w-[14rem] h-[25rem] p-12 rounded-sm bg-neutral-100 shadow-2xl'>
      {!loading ? (<> <img src={Livro} alt="livro" />
        <article className="flex flex-col text-start">
            <h2><strong>{nome}</strong></h2>
            <span>{autor}</span>
            <span>{genero}</span>
        </article>
        <button className="w-36 h-8 rounded-sm text-white shadow-2xl bg-yellow-300"><strong>VER MAIS</strong></button> </>) : (<img src={loadingGif}/>)}  
    </div>
  );
}