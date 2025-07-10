import ReinaldoOi from '../../images/ReinaldoOi.svg'
import Ellipse4 from '../../images/Ellipse4.svg'
import Ellipse5 from '../../images/Ellipse5.svg'
import { SearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export function Article({ handlePesquisa }) {
  const [query, setQuery] = useState('');

  const onInputChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    handlePesquisa(val);
  };

  return (
    <div className='w-screen h-1/2 p-12'>
      <article className='w-full grid grid-rows-1 grid-cols-2'>
        <div className='flex flex-wrap justify-around items-center'>
          <img className='sticky bottom-120 left-90' src={Ellipse4} alt="Ellipse 4" />
          <img className='sticky bottom-75' src={Ellipse5} alt="Ellipse 5" />
          <h2 className='w-96 text-3xl'>
            <strong>Criando hoje a tecnologia que transforma o amanhã</strong>
          </h2>
          <div className="flex items-center bg-white border border-gray-300 rounded-full shadow-md px-4 py-2 w-11/12 max-w-xl">
            <select className="bg-transparent outline-none text-gray-700 pr-2">
              <option value="all">Todos</option>
              <option value="titulo">Título</option>
              <option value="autores">Autores</option>
              <option value="categoria">Categoria</option>

            </select>
            <input
              type="text"
              value={query}
              onChange={onInputChange}
              className="flex-grow px-2 bg-transparent outline-none text-gray-800 placeholder-gray-400"
              placeholder="Pesquisar..."
            />
            <button>
              <SearchOutlined className="text-xl text-gray-600" />
            </button>
          </div>

        </div>
        <img className='mb-2' width={450} src={ReinaldoOi} alt="Reinaldo Oi" />
      </article>
    </div>
  );
}
