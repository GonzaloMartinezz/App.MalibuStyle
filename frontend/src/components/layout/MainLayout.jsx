import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-nivis-black text-white selection:bg-nivis-neon selection:text-nivis-black">
      <Navbar />
      <main>
        <Outlet />
      </main>

      {/* Global Footer (Technical style) */}
      <footer className="bg-nivis-black border-t border-white/5 py-20 px-8">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-6">
            <h3 className="text-2xl font-black uppercase tracking-tighter">MALIBU STYLES</h3>
            <p className="text-xs text-white/40 leading-relaxed uppercase font-mono tracking-widest">
              Advanced technical outerwear <br /> engineered for the extreme.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="text-[10px] font-mono text-nivis-neon uppercase tracking-widest">Navigation</h4>
            <ul className="text-xs space-y-2 uppercase font-bold tracking-tight">
              <li><a href="/shop" className="hover:text-nivis-neon transition-colors">Archive</a></li>
              <li><a href="/lab" className="hover:text-nivis-neon transition-colors">The Lab</a></li>
              <li><a href="/drops" className="hover:text-nivis-neon transition-colors">Drops</a></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-[10px] font-mono text-nivis-neon uppercase tracking-widest">Legal</h4>
            <ul className="text-xs space-y-2 uppercase font-bold tracking-tight">
              <li><a href="#" className="hover:text-nivis-neon transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-nivis-neon transition-colors">Terms of Service</a></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-[10px] font-mono text-nivis-neon uppercase tracking-widest">System Status</h4>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-nivis-neon rounded-full animate-pulse" />
              <span className="text-[10px] font-mono text-white/40 uppercase">All systems operational</span>
            </div>
          </div>
        </div>
        <div className="max-w-[1600px] mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-mono text-white/20 uppercase tracking-[0.3em]">
          <span>© 2024 NIVIS GEAR // BUILT FOR THE DESCENT</span>
          <span>MALIBU_STYLE_INFRASTRUCTURE_V1.0</span>
        </div>
      </footer>
    </div>
  );
}
