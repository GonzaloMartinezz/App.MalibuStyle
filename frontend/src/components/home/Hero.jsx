import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative w-full h-[85vh] md:h-screen flex items-center justify-center overflow-hidden bg-nivis-black pt-16 md:pt-0">

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0 scale-110"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1546519638-68e109498ffc?w=1920&q=80')" }}
      >
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Center Technical Box (The "Modal") */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-20 w-full max-w-4xl mx-4 sm:mx-6 bg-[#1a1a1a]/90 backdrop-blur-xl p-8 sm:p-12 md:p-14 rounded-xl border border-white/10 shadow-2xl overflow-hidden"
      >
        {/* HUD Markers (Top of Box) */}
        <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-center border-b border-white/5 text-[8px] sm:text-[10px] font-mono tracking-widest text-nivis-neon uppercase">
          <div className="flex items-center gap-2">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" /></svg>
            <span className="hidden xs:inline">MALIBU STYLES //</span> ARCHIVE
          </div>
          <div className="opacity-40 text-white font-sans tracking-[0.5em] truncate px-2">BASKETBALL CULTURE × STREETWEAR</div>
          <div className="flex items-center gap-2 text-white/60">
            <span className="hidden sm:inline">DESIGNED IN USA</span>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10M12 2a15.3 15.3 0 00-4 10M12 2a15.3 15.3 0 004 10" /></svg>
          </div>
        </div>

        <div className="mt-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
          <div className="relative">
            <h1 className="text-3xl sm:text-5xl md:text-[60px] lg:text-[80px] font-black text-white leading-[0.85] tracking-tighter uppercase">
              Cultura <br />
              de basket <br />
              al extremo.
            </h1>
            
            {/* Floating technical icon */}
            <div className="absolute top-0 -right-4 sm:-right-8 md:-right-20">
              <div className="w-12 h-12 md:w-20 md:h-20 bg-nivis-neon rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(212,255,60,0.3)]">
                <svg className="w-6 h-6 md:w-10 md:h-10 text-nivis-black" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Bottom Technical Section + Button (Inside the same box) */}
          <div className="flex flex-col gap-6 w-full md:w-auto">
            <div className="hidden md:block">
              <p className="text-[10px] font-mono text-white/40 uppercase tracking-[0.2em] mb-2">
                // SYSTEM_STATUS: ONLINE
              </p>
              <p className="text-[10px] font-mono text-white/40 uppercase tracking-[0.2em]">
                // HIGH PERFORMANCE APPAREL
              </p>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => window.location.href = '/novedades'}
              className="bg-nivis-neon text-nivis-black px-8 md:px-12 py-5 md:py-6 text-[10px] md:text-xs font-black uppercase tracking-widest flex items-center justify-between gap-6 transition-all duration-300 rounded shadow-[0_10px_40px_rgba(212,255,60,0.2)] group w-full"
            >
              <span>DESCUBRIR NOVEDADES</span>
              <svg className="w-4 h-4 transform group-hover:translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="3" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
