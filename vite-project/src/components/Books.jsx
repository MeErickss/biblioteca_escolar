import Livro from "./Livro.svg"

export function Books({nome, autor, genero}) {
  return (
    <div className='flex justify-between flex-wrap flex-col w-60 h-[28rem] p-12 rounded-sm bg-neutral-100 shadow-2xl'>
        <img src={Livro} alt="livro" />
        <article className="flex flex-col text-start">
            <h2><strong>{nome}</strong></h2>
            <span>{autor}</span>
            <span>{genero}</span>
        </article>
        <button className="w-36 h-8 rounded-sm text-white shadow-2xl bg-yellow-300"><strong>VER MAIS</strong></button>   
    </div>
  );
}