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
          <div className='w-full flex items-center'>
            <SearchOutlined className='pr-2 text-xl' />
            <input
              id="input"
              value={query}
              onChange={onInputChange}
              className='relative w-9/12 h-14 border-b-2 border-neutral-500 focus:outline-none'
              type="text"
              placeholder='Pesquisar...'
            />
          </div>
        </div>
        <img className='mb-2' width={450} src={ReinaldoOi} alt="Reinaldo Oi" />
      </article>
    </div>
  );
}
