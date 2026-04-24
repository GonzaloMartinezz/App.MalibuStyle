import React, { useRef } from 'react';
import Hero from '../components/home/Hero';
import { motion, useScroll, useTransform } from 'framer-motion';
import { productsData, buzosData } from '../data/productsData';
import { useNavigate } from 'react-router-dom';

// Best 6 products for the archive
const archiveProducts = [
  productsData[0], productsData[2], productsData[4],
  productsData[9], productsData[15], productsData[20]
];

// Combine for carousel
const carouselItems = [
  ...productsData.slice(0, 8),
  ...buzosData.slice(0, 4),
];

const Home = () => {
  const containerRef = useRef(null);
  const navigate = useNavigate();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const textX = useTransform(scrollYProgress, [0, 1], [0, -500]);
  const opacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <div ref={containerRef} className="bg-nivis-black relative">
      
      {/* 1. IMMERSIVE HERO */}
      <motion.div style={{ opacity }}>
        <Hero />
      </motion.div>

      {/* 2. PARALLAX TEXT */}
      <div className="h-screen sticky top-0 flex items-center justify-center pointer-events-none overflow-hidden z-10">
        <motion.h2 
          style={{ x: textX }}
          className="text-[20vw] font-black text-white/[0.03] whitespace-nowrap uppercase select-none leading-none"
        >
          MALIBU STYLES // PERFORMANCE // ARCHIVE // DESIGNED FOR THE EXTREME //
        </motion.h2>
      </div>

      {/* 3. FULL-WIDTH LOGO (transparent, sharp, with effects) */}
      <section className="relative z-20 bg-nivis-black py-20 px-8 overflow-hidden">
        <div className="max-w-[1600px] mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="relative group cursor-pointer"
          >
            {/* Glow effect behind logo */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[80%] h-[400px] bg-nivis-neon/5 blur-[150px] rounded-full group-hover:bg-nivis-neon/10 transition-all duration-1000" />
            </div>
            <img 
              src="/LOGO2.jpg" 
              alt="Malibu Style" 
              className="w-full h-auto object-contain relative z-10 mix-blend-lighten brightness-125 contrast-125 opacity-95 group-hover:opacity-100 group-hover:brightness-150 transition-all duration-700 group-hover:drop-shadow-[0_0_80px_rgba(212,255,60,0.2)] group-hover:scale-[1.02]"
            />
            {/* Scan line effect */}
            <motion.div 
              animate={{ top: ["0%", "100%", "0%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute left-0 right-0 h-px bg-nivis-neon/30 z-20"
            />
          </motion.div>
        </div>
      </section>

      {/* 4. AUTO-MOVING CAROUSEL (remeras + buzos) */}
      <section className="relative z-20 bg-nivis-black py-12 overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-8 mb-8 flex justify-between items-center">
          <span className="text-[10px] font-mono tracking-[0.3em] text-nivis-neon uppercase">FEATURED_ARCHIVE // AUTO_SCROLL</span>
          <button 
            onClick={() => navigate('/shop')}
            className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-white/40 hover:text-nivis-neon transition-colors flex items-center gap-2"
          >
            VIEW ALL
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeWidth="2"/></svg>
          </button>
        </div>
        
        {/* Auto-moving row */}
        <div className="overflow-hidden">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="flex gap-4"
          >
            {[...carouselItems, ...carouselItems].map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                onClick={() => navigate(`/product/${item.id}`)}
                className="flex-none w-[300px] md:w-[380px] cursor-pointer group"
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-[#161616] border border-white/5 group-hover:border-white/20 transition-all">
                  <img 
                    src={item.img} 
                    alt={item.name} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="text-sm font-black uppercase tracking-tight mb-1 truncate">{item.name}</h3>
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] font-mono text-white/40 uppercase">{item.category}</span>
                      <span className="text-sm font-black text-nivis-neon">${item.price.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 5. ARCHIVE — 6 Stacked Cards with scroll reveal */}
      <section className="relative z-20 bg-nivis-black pt-32 pb-20 px-8">
        <div className="max-w-[1600px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <span className="text-[10px] font-mono tracking-[0.5em] text-nivis-neon uppercase block mb-4">CORE_ARCHIVE_2024</span>
            <h2 className="text-5xl md:text-9xl font-black uppercase tracking-tighter leading-[0.85]">
              Archivo.
            </h2>
            <div className="w-20 h-1 bg-nivis-neon mt-8" />
          </motion.div>

          {/* Stacked Cards — each appears as you scroll */}
          <div className="space-y-8">
            {archiveProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 120, scale: 0.92 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: false, amount: 0.3 }}
                onClick={() => navigate(`/product/${product.id}`)}
                className="sticky cursor-pointer group"
                style={{ top: `${100 + index * 30}px`, zIndex: index + 1 }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-0 rounded-xl overflow-hidden border border-white/5 bg-[#111111] shadow-[0_30px_60px_rgba(0,0,0,0.5)] group-hover:border-white/15 transition-all">
                  {/* Image */}
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <img 
                      src={product.img} 
                      alt={product.name} 
                      className="w-full h-full object-cover grayscale-[50%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#111111]/50" />
                    
                    {/* Small thumbnail grid — bottom left */}
                    <div className="absolute bottom-4 left-4 flex gap-1.5">
                      {archiveProducts.slice(0, 4).map((thumb, tIdx) => (
                        <div 
                          key={thumb.id} 
                          className={`w-10 h-10 rounded-sm overflow-hidden border ${tIdx === index % 4 ? 'border-nivis-neon' : 'border-white/10'} transition-all`}
                        >
                          <img src={thumb.img} alt="" className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-8 lg:p-12 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-mono tracking-[0.3em] text-white/20 uppercase block mb-3">
                        UNIT_{String(index + 1).padStart(2, '0')} // ARCHIVE
                      </span>
                      <h3 className="text-2xl lg:text-3xl font-black uppercase tracking-tighter leading-[0.9] mb-4 group-hover:text-nivis-neon transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-xs text-white/40 leading-relaxed">{product.description}</p>
                    </div>
                    <div className="flex justify-between items-end mt-6 pt-4 border-t border-white/5">
                      <span className="text-2xl font-black">${product.price.toLocaleString()}</span>
                      <span className="text-[9px] font-mono text-nivis-neon uppercase tracking-widest flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 bg-nivis-neon rounded-full" /> VIEW DETAILS →
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. BRAND PHILOSOPHY */}
      <section className="relative z-30 bg-nivis-black py-40 px-8 border-t border-white/5 overflow-hidden">
        <div className="max-w-[1600px] mx-auto flex flex-col items-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-center relative"
          >
             <h3 className="relative z-10 text-6xl md:text-[120px] font-black uppercase tracking-tighter leading-none mb-12">
               Basketball <br /> Culture <br /> Meets <br /> Style.
             </h3>
             <motion.div 
               initial={{ width: 0 }}
               whileInView={{ width: 120 }}
               transition={{ duration: 1, delay: 0.5 }}
               className="h-1.5 bg-nivis-neon mx-auto" 
             />
          </motion.div>
          
          <motion.div 
             initial={{ opacity: 0, y: 50 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.3 }}
             className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-12 w-full text-center"
          >
             <div className="space-y-4">
               <h4 className="text-[10px] font-mono text-nivis-neon uppercase tracking-widest">Innovation</h4>
               <p className="text-xs text-white/40 uppercase font-bold tracking-widest">Algodón Premium 100%</p>
             </div>
             <div className="space-y-4">
               <h4 className="text-[10px] font-mono text-nivis-neon uppercase tracking-widest">Durability</h4>
               <p className="text-xs text-white/40 uppercase font-bold tracking-widest">Basketball Culture</p>
             </div>
             <div className="space-y-4">
               <h4 className="text-[10px] font-mono text-nivis-neon uppercase tracking-widest">Vision</h4>
               <p className="text-xs text-white/40 uppercase font-bold tracking-widest">Archive v1.024</p>
             </div>
          </motion.div>
        </div>
      </section>

      {/* Bottom Marquee */}
      <div className="relative z-30 bg-nivis-neon py-2 text-nivis-black overflow-hidden flex whitespace-nowrap">
         <motion.div 
           animate={{ x: ["0%", "-50%"] }}
           transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
           className="flex gap-20 text-[10px] font-black uppercase tracking-widest"
         >
           <span>MALIBU STYLES // BASKETBALL CULTURE // STREETWEAR PREMIUM // HIGH PERFORMANCE APPAREL // </span>
           <span>MALIBU STYLES // BASKETBALL CULTURE // STREETWEAR PREMIUM // HIGH PERFORMANCE APPAREL // </span>
         </motion.div>
      </div>
    </div>
  );
};

export default Home;
