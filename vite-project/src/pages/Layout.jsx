// Layout.jsx
import { Outlet } from 'react-router-dom';
import { Header } from "../components/Header"
import { Footer } from "../components/Footer"


export function Layout() {
  return (
    <div className='overflow-x-hidden'>
      {/* Cabeçalho/menu que aparece em todas as páginas */}
      <Header/>

      {/* Área onde as rotas filhas serão renderizadas */}
      <main>
        <Outlet />
      </main>

      {/* Rodapé que aparece em todas as páginas */}
      <Footer/>
    </div>
  );
}