// Layout.jsx
import { Outlet } from 'react-router-dom';
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export function Layout() {

  return (
    <div className='overflow-x-hidden'>
      <Header />

      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
