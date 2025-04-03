// Layout.jsx
import { Outlet } from 'react-router-dom';

export function Layout() {
  return (
    <div>
      {/* Cabeçalho/menu que aparece em todas as páginas */}
      <header className='flex flex-wrap w-screen h-1/6 bg-neutral-300'>
      a
      </header>

      {/* Área onde as rotas filhas serão renderizadas */}
      <main>
        <Outlet />
      </main>

      {/* Rodapé que aparece em todas as páginas */}
      <footer className='flex flex-wrap w-screen h-96'>
        <p>© 2023 Biblioteca Escolar</p>
      </footer>
    </div>
  );
}