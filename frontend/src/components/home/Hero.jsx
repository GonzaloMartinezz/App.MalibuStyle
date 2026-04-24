import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-nivis-black">
      
      {/* Background Image (Action skiing from Nivis Gear) */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0 scale-110"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=1920&q=80')" }}
      >
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* Center Red Indicator Dot (From screenshot) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[100px] z-10">
         <div className="w-1 h-8 bg-red-500 rounded-full animate-pulse" />
      </div>

      {/* Center Technical Box */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-20 w-full max-w-5xl mx-6 bg-[#2a2a2a]/85 backdrop-blur-xl p-12 md:p-16 rounded-xl border border-white/10 shadow-2xl overflow-hidden"
      >
        {/* HUD Markers */}
        <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-center border-b border-white/5 text-[10px] font-mono tracking-widest text-nivis-neon uppercase">
           <div className="flex items-center gap-2">
             <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>
             MALIBU STYLES // ARCHIVE
           </div>
           <div className="opacity-40 text-white font-sans tracking-[0.5em]">ELEVATE EVERY DESCENT</div>
           <div className="flex items-center gap-2 text-white/60">
             DESIGNED IN USA
             <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10M12 2a15.3 15.3 0 00-4 10 15.3 15.3 0 004 10"/></svg>
           </div>
        </div>

        <div className="mt-12 flex flex-col md:flex-row justify-between items-end gap-12">
          <div className="relative">
            <h1 className="text-6xl md:text-[100px] font-black text-white leading-[0.85] tracking-tighter uppercase">
              Materials <br />
              science meets <br />
              mother nature.
            </h1>
            {/* The floating icon/dot next to "Materials" */}
            <div className="absolute top-8 right-[-50px] md:top-12 md:right-[-70px]">
               <div className="w-12 h-12 md:w-16 md:h-16 bg-nivis-neon rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 md:w-8 md:h-8 text-nivis-black" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z"/>
                  </svg>
               </div>
            </div>
          </div>

          <motion.button 
            whileHover={{ scale: 1.02, backgroundColor: "#ffffff" }}
            whileTap={{ scale: 0.98 }}
            className="bg-nivis-neon text-nivis-black px-10 py-6 text-xs font-black uppercase tracking-widest flex flex-col items-start leading-tight transition-all duration-300 rounded shadow-[0_10px_40px_rgba(212,255,60,0.2)] group"
          >
            <div className="flex justify-between w-full items-center mb-1">
              <span>DISCOVER</span>
              <svg className="w-4 h-4 transform group-hover:translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="3" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
            </div>
            <span>OUR PRODUCTS</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Decorative corners or indicators can go here */}
    </section>
  );
}
