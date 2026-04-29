import React, { useRef } from 'react';
import Hero from '../components/home/Hero';
import { motion, useScroll, useTransform } from 'framer-motion';
import { productsData, buzosData } from '../data/productsData';
import { useNavigate } from 'react-router-dom';

const allProducts = [...productsData, ...buzosData];
const marqueeItems = [...allProducts].sort(() => 0.5 - Math.random()).slice(0, 15);

const buySteps = [
  { step: '01', icon: '🔍', title: 'Explorá', desc: 'Navegá por nuestra colección premium de streetwear.' },
  { step: '02', icon: '🛒', title: 'Seleccioná', desc: 'Elegí tus prendas favoritas y el talle ideal.' },
  { step: '03', icon: '💳', title: 'Checkout Seguro', desc: 'Completá tu pago con todos los medios disponibles.' },
  { step: '04', icon: '📦', title: 'Recibí en Casa', desc: 'Enviamos tu pedido a cualquier punto del país.' },
];

export default function Home() {
  const containerRef = useRef(null);
  const navigate = useNavigate();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

  return (
    <div ref={containerRef} className="bg-nivis-black relative min-h-screen font-sans">

      {/* ── 1. HERO ── */}
      <motion.div style={{ opacity }}>
        <Hero />
      </motion.div>

      {/* ── 2. INFINITE PRODUCT MARQUEE ── */}
      <section className="relative z-20 py-8 md:py-12 overflow-hidden bg-nivis-black border-y border-white/5">
        <div className="absolute top-0 left-0 w-32 h-full bg-linear-to-r from-nivis-black to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-32 h-full bg-linear-to-l from-nivis-black to-transparent z-10 pointer-events-none" />

        <div className="flex w-[200%] animate-marquee hover:[animation-play-state:paused] items-center">
          <div className="px-8 shrink-0 text-white/30 font-mono text-xs tracking-widest uppercase">ÚLTIMOS INGRESOS</div>
          {[...marqueeItems, ...marqueeItems].map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              onClick={() => navigate(`/product/${item.id}`)}
              className="w-[180px] sm:w-[240px] md:w-[300px] shrink-0 mx-3 md:mx-5 cursor-pointer group"
            >
              <div className="relative aspect-4/5 rounded-xl overflow-hidden bg-[#111] border border-white/5 group-hover:border-nivis-neon/50 transition-all duration-500">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 left-0 w-full p-3 md:p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                  <h3 className="text-[10px] md:text-xs font-black text-white uppercase tracking-tighter truncate mb-1">{item.name}</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-[8px] font-mono text-white/50 uppercase tracking-widest hidden sm:block">{item.category}</span>
                    <span className="text-[10px] md:text-xs font-black text-nivis-neon">${item.price.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 3. GRANDEZA Y ESPÍRITU (BASKETBALL SOUL) ── */}
      <section className="relative z-20 overflow-hidden bg-nivis-black py-24 md:py-40">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-nivis-neon/5 blur-[120px] pointer-events-none" />
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex flex-col lg:flex-row gap-16 md:gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2 }}
              viewport={{ once: true }}
              className="w-full lg:w-1/2 relative group"
            >
              <div className="relative aspect-4/5 rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1546519638-68e109498ffc?w=1200&q=90"
                  alt="Basketball Culture"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent" />
              </div>
              {/* Floating Tech Marker */}
              <div className="absolute -bottom-6 -right-6 md:-right-10 bg-nivis-neon text-black p-6 md:p-8 rounded-sm shadow-2xl">
                <p className="text-[10px] font-mono font-black tracking-[0.3em] uppercase mb-1">CULTURA_EST_99</p>
                <h4 className="text-2xl md:text-3xl font-black uppercase tracking-tighter">BORN IN<br />COURT.</h4>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, delay: 0.2 }}
              viewport={{ once: true }}
              className="w-full lg:w-1/2 space-y-8 md:space-y-12"
            >
              <div className="space-y-4 md:space-y-6">
                <span className="text-[10px] font-mono text-nivis-neon uppercase tracking-[0.5em] block mb-2">NUESTRO ADN // FILOSOFÍA</span>
                <h2 className="text-5xl sm:text-6xl md:text-8xl font-serif italic tracking-tighter leading-[0.85] text-white">
                  Mentalidad <br /><span className="text-nivis-neon not-italic font-black uppercase">Ganadora.</span>
                </h2>
                <p className="text-sm md:text-lg text-white/60 font-sans leading-relaxed tracking-wide max-w-xl">
                  No fabricamos ropa, encapsulamos la intensidad del juego. Cada fibra de Malibu Style respira la disciplina del parqué y la libertad del asfalto.
                  <br /><br />
                  La excelencia no es un acto, es un hábito. Por eso nuestras prendas están diseñadas para acompañarte tanto en el entrenamiento más duro como en tu día a día, ofreciendo la máxima comodidad sin comprometer el estilo urbano.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-8 md:gap-12 py-8 border-y border-white/5">
                <div>
                  <h4 className="text-2xl md:text-4xl font-black text-nivis-neon mb-1">PREMIUM</h4>
                  <p className="text-[9px] font-mono text-white/30 uppercase tracking-[0.2em]">Algodón 24/1 Peinado</p>
                </div>
                <div>
                  <h4 className="text-2xl md:text-4xl font-black text-nivis-neon mb-1">OVERSIZE</h4>
                  <p className="text-[9px] font-mono text-white/30 uppercase tracking-[0.2em]">Corte Urbano Auténtico</p>
                </div>
              </div>

              <button
                onClick={() => navigate('/shop')}
                className="group flex items-center gap-4 text-xs font-black uppercase tracking-[0.3em] hover:text-nivis-neon transition-colors"
              >
                <span>Explorar el Archivo</span>
                <span className="w-12 h-px bg-white group-hover:bg-nivis-neon transition-all group-hover:w-16" />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 4. PASOS PARA COMPRAR (CLEANER) ── */}
      <section className="relative z-20 py-24 md:py-40 bg-[#050505] border-y border-white/5">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-24 gap-8">
            <div className="max-w-xl">
              <span className="text-[10px] font-mono tracking-[0.5em] text-nivis-neon uppercase block mb-4">WORKFLOW // PROCESO</span>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">Tu pedido, <br />Paso a Paso.</h2>
            </div>
            <p className="text-[10px] font-mono text-white/20 uppercase tracking-widest text-right">04 STEPS TO GLORY</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {buySteps.map((feat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-[#0c0c0c] p-10 md:p-12 border border-white/5 hover:border-nivis-neon/30 transition-all group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-8 text-7xl font-black text-white/2 group-hover:text-nivis-neon/5 transition-colors pointer-events-none">
                  {feat.step}
                </div>
                <div className="text-4xl mb-8 group-hover:scale-110 transition-transform origin-left">{feat.icon}</div>
                <h3 className="text-lg font-black uppercase tracking-tight mb-4 group-hover:text-nivis-neon transition-colors">{feat.title}</h3>
                <p className="text-[10px] text-white/30 leading-relaxed font-mono tracking-widest uppercase">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. ABOUT THE FOUNDER / CEO CTA (ENHANCED) ── */}
      <section className="relative z-20 py-32 md:py-52 px-6 overflow-hidden bg-nivis-black">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,255,60,0.03)_0%,transparent_70%)] pointer-events-none" />
        <div className="max-w-[1000px] mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="space-y-10 md:space-y-16"
          >
            <div className="inline-block px-4 py-1 border border-nivis-neon/30 rounded-full">
              <span className="text-[9px] md:text-[10px] font-mono text-nivis-neon uppercase tracking-[0.4em]">ORIGIN_STORY</span>
            </div>

            <h2 className="text-5xl sm:text-7xl md:text-9xl font-black uppercase tracking-tighter leading-[0.8] text-white">
              De la cancha<br />al diseño.
            </h2>

            <p className="text-sm md:text-xl text-white/40 font-mono leading-relaxed uppercase tracking-[0.2em] max-w-2xl mx-auto">
              Conocé la trayectoria de nuestro Fundador. Del Club Belgrano a la cima del streetwear con mentalidad de campeón.
            </p>

            <button
              onClick={() => navigate('/sobre-mi')}
              className="relative inline-flex items-center justify-center px-12 py-6 overflow-hidden font-black text-xs uppercase tracking-[0.4em] text-nivis-black bg-nivis-neon transition-all hover:bg-white group"
            >
              <span className="relative z-10">Conocer la Historia</span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* ── 6. BIG BRAND PARALLAX (REFINED) ── */}
      <section className="relative z-20 bg-[#050505] py-32 md:py-60 overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,255,60,0.05)_0,rgba(5,5,5,1)_80%)]" />
        <div className="max-w-[1600px] mx-auto text-center relative z-10 px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <h3 className="text-[14vw] md:text-[180px] lg:text-[220px] font-black uppercase tracking-tighter leading-[0.75] text-transparent bg-clip-text bg-linear-to-b from-white via-white/50 to-transparent">
              Malibu<br />Styless.
            </h3>
            <p className="mt-12 text-[10px] md:text-xs font-mono text-nivis-neon uppercase tracking-[0.8em]">UNSTOPPABLE_LEGACY</p>
          </motion.div>
        </div>
      </section>

      {/* ── BOTTOM MARQUEE ── */}
      <div className="relative z-30 bg-nivis-neon py-4 text-nivis-black overflow-hidden flex whitespace-nowrap">
        <div className="flex animate-marquee-slow text-[10px] md:text-xs font-black uppercase tracking-[0.4em]">
          <span>MALIBU STYLESS // BASKETBALL CULTURE // STREETWEAR PREMIUM // BELGRANO CULTURAL Y DEPORTIVO // </span>
          <span>MALIBU STYLESS // BASKETBALL CULTURE // STREETWEAR PREMIUM // BELGRANO CULTURAL Y DEPORTIVO // </span>
        </div>
      </div>

    </div>
  );
}
