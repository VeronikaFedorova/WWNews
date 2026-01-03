import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import SideMenu from '../components/SideMenu';
import Footer from '../components/Footer';

export default function AppLayout() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <Header onOpenMenu={() => setMenuOpen(true)} />
      <SideMenu open={menuOpen} onClose={() => setMenuOpen(false)} />

      <main className='min-h-[calc(100vh-120px)] max-w-6xl mx-auto px-4 py-6 '>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
