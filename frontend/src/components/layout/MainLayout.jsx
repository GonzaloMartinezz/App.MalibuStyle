import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-nivis-black text-white selection:bg-nivis-neon selection:text-nivis-black">
      <Navbar />
      <main>
        <Outlet />
      </main>

      {/* Global Footer */}
      <footer className="relative z-20 bg-nivis-black border-t border-white/5 py-12 md:py-20 px-4 md:px-8">
        <div className="max-w-[1600px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          <div className="space-y-4 md:space-y-6 col-span-2 md:col-span-1">
            <h3 className="text-xl md:text-2xl font-black uppercase tracking-tighter">MALIBU STYLESS</h3>
            <p className="text-[10px] md:text-xs text-white/40 leading-relaxed uppercase font-mono tracking-widest">
              Streetwear premium <br /> basketball culture.
            </p>
          </div>
          <div className="space-y-3 md:space-y-4">
            <h4 className="text-[9px] md:text-[10px] font-mono text-nivis-neon uppercase tracking-widest">Navegación</h4>
            <ul className="text-xs space-y-2 uppercase font-bold tracking-tight">
              <li><a href="/shop" className="hover:text-nivis-neon transition-colors">Remeras</a></li>
              <li><a href="/buzos" className="hover:text-nivis-neon transition-colors">Buzos</a></li>
              <li><a href="/novedades" className="hover:text-nivis-neon transition-colors">Novedades</a></li>
            </ul>
          </div>
          <div className="space-y-3 md:space-y-4">
            <h4 className="text-[9px] md:text-[10px] font-mono text-nivis-neon uppercase tracking-widest">Legal</h4>
            <ul className="text-xs space-y-2 uppercase font-bold tracking-tight">
              <li><a href="#" className="hover:text-nivis-neon transition-colors">Privacidad</a></li>
              <li><a href="#" className="hover:text-nivis-neon transition-colors">Términos</a></li>
            </ul>
          </div>
          <div className="space-y-3 md:space-y-4">
            <h4 className="text-[9px] md:text-[10px] font-mono text-nivis-neon uppercase tracking-widest">Estado</h4>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-nivis-neon rounded-full animate-pulse" />
              <span className="text-[9px] md:text-[10px] font-mono text-white/40 uppercase">Operativo</span>
            </div>
          </div>
        </div>
        <div className="max-w-[1600px] mx-auto mt-12 md:mt-20 pt-6 md:pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4 text-[8px] md:text-[10px] font-mono text-white/20 uppercase tracking-[0.2em] md:tracking-[0.3em]">
          <span>© 2024 MALIBU STYLESS</span>
          <span>V1.0</span>
        </div>
      </footer>
    </div>
  );
}
