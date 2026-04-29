import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative w-full h-screen min-h-[500px] flex items-center justify-center overflow-hidden bg-nivis-black pt-16 md:pt-0">

      {/* Cinematic Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          initial={{ scale: 1.15, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2.5, ease: "easeOut" }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1518063319789-7217e6706b04?q=80&w=2000')" }}
        />
        <div className="absolute inset-0 bg-linear-to-t from-nivis-black via-nivis-black/60 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-r from-nivis-black/80 via-transparent to-transparent" />
        <motion.div
          animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.05, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[30%] left-[20%] w-[50vw] h-[50vw] max-w-[800px] max-h-[800px] bg-nivis-neon/15 blur-[120px] rounded-full pointer-events-none"
        />
      </div>

      {/* Main Content Box - Made more compact */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        className="relative z-20 w-[90%] max-w-[1000px] mx-auto glass-panel p-6 sm:p-10 md:p-12 lg:p-14 rounded-2xl md:rounded-[30px] shadow-2xl overflow-hidden mt-8 md:mt-0"
      >
        {/* Glow Line Top */}
        <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-nivis-neon/40 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />

        {/* HUD Markers */}
        <div className="absolute top-0 left-0 w-full px-6 py-4 md:px-8 md:py-5 flex justify-between items-center text-[8px] sm:text-[9px] md:text-[10px] font-mono tracking-[0.3em] text-nivis-neon uppercase">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 }}
            className="flex items-center gap-2"
          >
            <div className="w-1.5 h-1.5 bg-nivis-neon animate-pulse rounded-full" />
            <span className="hidden xs:inline text-white/80">MALIBU STYLES //</span> <span className="font-bold">ARCHIVE</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="hidden md:block opacity-40 text-white tracking-[0.5em] truncate px-4"
          >
            BASKETBALL CULTURE
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 }}
            className="flex items-center gap-2 text-white/60"
          >
            <span className="hidden sm:inline">MADE IN ARGENTINA</span>
            <svg className="w-3.5 h-3.5 text-nivis-neon" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10M12 2a15.3 15.3 0 00-4 10M12 2a15.3 15.3 0 004 10" /></svg>
          </motion.div>
        </div>

        <div className="mt-6 md:mt-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-8 md:gap-12">

          {/* Typography Section */}
          <div className="relative z-10 w-full md:w-auto flex-1">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[0.9] tracking-tighter uppercase"
            >
              <span className="block text-transparent bg-clip-text bg-linear-to-r from-white to-white/60">Cultura</span>
              <span className="block">de basket</span>
              <span className="block text-transparent bg-clip-text bg-linear-to-r from-nivis-neon to-nivis-neon/70">al extremo.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-4 md:mt-6 text-[10px] sm:text-xs text-white/50 font-mono max-w-sm uppercase tracking-[0.15em] leading-relaxed"
            >
              Elevamos el streetwear al siguiente nivel. Diseños exclusivos inspirados en la esencia del juego.
            </motion.p>
          </div>

          {/* Action Section */}
          <div className="flex flex-col gap-4 md:gap-6 w-full md:w-auto md:min-w-[260px]">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 }}
              className="hidden md:block border-l-2 border-nivis-neon/30 pl-3"
            >
              <p className="text-[9px] font-mono text-nivis-neon uppercase tracking-[0.2em] mb-1 font-bold">
                // SYSTEM_STATUS: ONLINE
              </p>
              <p className="text-[9px] font-mono text-white/40 uppercase tracking-[0.2em]">
                // HIGH PERFORMANCE
              </p>
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.03, backgroundColor: '#e2ff66' }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
              onClick={() => navigate('/novedades')}
              className="w-full bg-nivis-neon text-nivis-black px-5 py-4 sm:py-5 text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] flex items-center justify-between gap-4 transition-all duration-300 rounded-lg shadow-[0_10px_30px_rgba(212,255,60,0.2)] hover:shadow-[0_15px_40px_rgba(212,255,60,0.3)] group overflow-hidden relative"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <span className="relative z-10">Explorar Novedades</span>
              <div className="relative z-10 w-8 h-8 md:w-10 md:h-10 bg-nivis-black rounded-full flex items-center justify-center group-hover:rotate-45 transition-transform duration-500">
                <svg className="w-4 h-4 md:w-5 md:h-5 text-nivis-neon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </div>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
