import ReinaldoOi from '../../images/ReinaldoOi.svg'
import Ellipse4 from '../../images/Ellipse4.svg'
import Ellipse5 from '../../images/Ellipse5.svg'


export function Article() {
  return (
    <div className='w-screen h-screen p-12'>
        <article className='h-82 grid grid-rows-1 grid-cols-2'>
          <div className='flex flex-wrap justify-around items-center'>
            <img className='sticky bottom-120 left-90' src={Ellipse4}/>
            <img className='sticky bottom-75' src={Ellipse5}/>
            <h2 className='w-96 text-3xl'><strong>Criando hoje a tecnologia que transforma o amanhã</strong></h2>
            <input className='relative w-9/12 h-14 border-b-2 border-neutral-500 focus:outline-none' type="text" placeholder='Pesquisar' />
          </div>
          <img className='mb-2' width={450} src={ReinaldoOi}/>
        </article>
    </div>
  );
}