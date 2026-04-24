import React, { useRef } from 'react';
import Hero from '../components/home/Hero';
import { motion, useScroll, useTransform } from 'framer-motion';
import { productsData, buzosData } from '../data/productsData';
import { useNavigate } from 'react-router-dom';

// Combine for carousel
const carouselItems = [
  ...productsData.slice(0, 8),
  ...buzosData.slice(0, 4),
];

// Best 6 products for featured
const featuredProducts = [
  productsData[0], productsData[4], productsData[9],
  buzosData[0], buzosData[2], productsData[15]
];

// Basketball images for parallax mosaic — Unsplash curated
const basketballImages = [
  { url: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&q=90', label: 'GAME DAY' },
  { url: 'https://images.unsplash.com/photo-1521412644187-c49fa049e84d?w=800&q=90', label: 'CULTURE' },
  { url: 'https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=800&q=90', label: 'STREET' },
  { url: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?w=800&q=90', label: 'COURTS' },
  { url: 'https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?w=800&q=90', label: 'HUSTLE' },
  { url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=90', label: 'STYLE' },
];

// Features / benefits
const features = [
  { icon: '🏀', title: 'Basketball Culture', desc: 'Diseños exclusivos inspirados en la cultura NBA y streetwear urbano.' },
  { icon: '🧵', title: 'Algodón Premium', desc: 'Confección 100% algodón rústico y peinado de alta densidad.' },
  { icon: '📦', title: 'Envío Gratis', desc: 'Envío gratuito a todo el país en compras superiores a $50.000.' },
  { icon: '✨', title: 'Edición Limitada', desc: 'Colecciones únicas con tiradas reducidas para coleccionistas.' },
];

const Home = () => {
  const containerRef = useRef(null);
  const navigate = useNavigate();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const textX = useTransform(scrollYProgress, [0, 0.4], [0, -600]);
  const opacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  return (
    <div ref={containerRef} className="bg-nivis-black relative">

      {/* ── 1. HERO ── */}
      <motion.div style={{ opacity }}>
        <Hero />
      </motion.div>

      {/* ── 2. PARALLAX TEXT + BASKETBALL MOSAIC ── */}
      <section className="relative">
        {/* Basketball image grid — shown ABOVE the ghost text on scroll */}
        <div className="relative z-20 -mt-8 sm:-mt-12 md:-mt-20 px-3 sm:px-4 md:px-8 pb-0">
          <div className="max-w-[1600px] mx-auto">
            {/* Label */}
            <div className="flex justify-between items-center mb-3 md:mb-5">
              <span className="text-[8px] sm:text-[9px] md:text-[10px] font-mono tracking-[0.3em] text-nivis-neon uppercase">ARCHIVE // BASKETBALL CULTURE</span>
              <span className="text-[8px] sm:text-[9px] font-mono text-white/20 uppercase tracking-widest hidden sm:block">VOL. 01</span>
            </div>

            {/* Grid — 2 cols mobile, 3 cols tablet, 6 cols desktop */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-3">
              {basketballImages.map((img, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: idx * 0.08 }}
                  viewport={{ once: true, margin: "-50px" }}
                  className="group relative aspect-2/3 overflow-hidden rounded-lg bg-[#111] border border-white/5 hover:border-white/20 transition-all cursor-pointer"
                >
                  <img
                    src={img.url}
                    alt={img.label}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                  />
                  {/* dark overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
                  {/* label */}
                  <div className="absolute bottom-0 left-0 right-0 p-2 md:p-3">
                    <span className="text-[7px] md:text-[8px] font-black font-mono uppercase tracking-[0.2em] text-nivis-neon">
                      {img.label}
                    </span>
                  </div>
                  {/* index number */}
                  <div className="absolute top-2 right-2 text-[8px] md:text-[9px] font-mono text-white/20">
                    0{idx + 1}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. PARALLAX BIG BASKETBALL SECTION ── */}
      <section className="relative z-20 mt-8 md:mt-16 overflow-hidden">
        {/* bg-fixed creates the parallax effect on desktop; on mobile we use normal bg */}
        <div
          className="h-[50vh] sm:h-[65vh] md:h-[80vh] bg-cover bg-center md:bg-fixed relative"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1546519638-68e109498ffc?w=1920&q=80')" }}
        >
          <div className="absolute inset-0 bg-linear-to-b from-nivis-black via-black/30 to-nivis-black" />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2 }}
              viewport={{ once: true }}
              className="text-center px-4"
            >
              <h2 className="text-[16vw] sm:text-[14vw] md:text-[18vw] lg:text-[20vw] font-black uppercase tracking-tighter leading-[0.75] text-white/90 drop-shadow-2xl">
                <span className="text-white">MALI</span><span className="text-nivis-neon">BU</span>
              </h2>
              <p className="text-[9px] sm:text-xs md:text-sm font-mono uppercase tracking-[0.3em] sm:tracking-[0.5em] text-white/40 mt-3 md:mt-6">
                Basketball Culture × Streetwear
              </p>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: 60 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-1 bg-nivis-neon mx-auto mt-3 md:mt-6"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 4. SECOND PARALLAX — Split dual images ── */}
      <section className="relative z-20 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-[40vh] sm:min-h-[50vh] md:min-h-[70vh]">
          {/* Left panel */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9 }}
            viewport={{ once: true }}
            className="relative h-[40vh] sm:h-[50vh] md:h-auto overflow-hidden"
          >
            <div
              className="absolute inset-0 bg-cover bg-center md:bg-fixed"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1504450758481-7338eba7524a?w=1200&q=85')" }}
            />
            <div className="absolute inset-0 bg-linear-to-r from-nivis-black/60 to-transparent" />
            <div className="absolute inset-0 flex items-end p-6 md:p-12">
              <div>
                <span className="text-[8px] md:text-[10px] font-mono text-nivis-neon uppercase tracking-widest block mb-1 md:mb-2">STREET COURTS</span>
                <h3 className="text-xl sm:text-2xl md:text-4xl font-black uppercase tracking-tighter">Donde nace<br />el estilo.</h3>
              </div>
            </div>
          </motion.div>
          {/* Right panel */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            viewport={{ once: true }}
            className="relative h-[40vh] sm:h-[50vh] md:h-auto overflow-hidden"
          >
            <div
              className="absolute inset-0 bg-cover bg-center md:bg-fixed"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&q=85')" }}
            />
            <div className="absolute inset-0 bg-linear-to-l from-nivis-black/60 to-transparent" />
            <div className="absolute inset-0 flex items-end justify-end p-6 md:p-12">
              <div className="text-right">
                <span className="text-[8px] md:text-[10px] font-mono text-nivis-neon uppercase tracking-widest block mb-1 md:mb-2">PREMIUM APPAREL</span>
                <h3 className="text-xl sm:text-2xl md:text-4xl font-black uppercase tracking-tighter">Hecho para<br />jugar fuerte.</h3>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 5. AUTO-MOVING PRODUCT CAROUSEL ── */}
      <section className="relative z-20 bg-nivis-black py-8 md:py-12 overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 mb-4 md:mb-8 flex justify-between items-center">
          <span className="text-[8px] sm:text-[9px] md:text-[10px] font-mono tracking-[0.3em] text-nivis-neon uppercase">FEATURED_ARCHIVE // AUTO_SCROLL</span>
          <button
            onClick={() => navigate('/shop')}
            className="text-[9px] md:text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-white/40 hover:text-nivis-neon transition-colors flex items-center gap-2"
          >
            VER TODO
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeWidth="2" /></svg>
          </button>
        </div>

        <div className="overflow-hidden">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="flex gap-3 md:gap-4"
          >
            {[...carouselItems, ...carouselItems].map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                onClick={() => navigate(`/product/${item.id}`)}
                className="flex-none w-[160px] sm:w-[220px] md:w-[320px] cursor-pointer group"
              >
                <div className="relative aspect-3/4 overflow-hidden rounded-lg bg-[#161616] border border-white/5 group-hover:border-white/20 transition-all">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-2 md:p-5">
                    <h3 className="text-[9px] sm:text-[11px] md:text-sm font-black uppercase tracking-tight mb-1 truncate">{item.name}</h3>
                    <div className="flex justify-between items-center">
                      <span className="text-[7px] md:text-[9px] font-mono text-white/40 uppercase hidden sm:block">{item.category}</span>
                      <span className="text-[10px] md:text-sm font-black text-nivis-neon">${item.price.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 6. FEATURES CARDS ── */}
      <section className="relative z-20 py-12 sm:py-16 md:py-24 px-4 md:px-8 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-1/4 w-[50%] h-[50%] bg-nivis-neon/3 blur-[200px] rounded-full" />
          <div className="absolute bottom-0 right-1/4 w-[40%] h-[40%] bg-purple-500/3 blur-[200px] rounded-full" />
        </div>
        <div className="max-w-[1400px] mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-10 md:mb-16"
          >
            <span className="text-[9px] md:text-[10px] font-mono tracking-[0.5em] text-nivis-neon uppercase block mb-3 md:mb-4">¿POR QUÉ ELEGIRNOS?</span>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black uppercase tracking-tighter">La mejor calidad.</h2>
          </motion.div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            {features.map((feat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-[#111]/80 backdrop-blur-xl border border-white/5 rounded-xl p-4 sm:p-6 md:p-8 hover:border-white/15 transition-all group"
              >
                <div className="text-2xl md:text-4xl mb-3 md:mb-6">{feat.icon}</div>
                <h3 className="text-xs md:text-base font-black uppercase tracking-tight mb-1 md:mb-3 group-hover:text-nivis-neon transition-colors">{feat.title}</h3>
                <p className="text-[9px] md:text-xs text-white/40 leading-relaxed hidden sm:block">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. FEATURED PRODUCTS GRID ── */}
      <section className="relative z-20 bg-nivis-black py-10 sm:py-12 md:py-16 px-4 md:px-8">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6 md:mb-10 gap-4"
          >
            <div>
              <span className="text-[8px] md:text-[9px] font-mono tracking-[0.4em] text-nivis-neon uppercase block mb-1 md:mb-2">SELECCIÓN DESTACADA</span>
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-black uppercase tracking-tighter leading-[0.85]">Los más<br className="hidden md:block" /> vendidos.</h2>
            </div>
            <button
              onClick={() => navigate('/shop')}
              className="bg-white/5 border border-white/10 px-4 md:px-6 py-2 md:py-3 text-[8px] md:text-[10px] font-black uppercase tracking-widest hover:bg-nivis-neon hover:text-black hover:border-nivis-neon transition-all whitespace-nowrap"
            >
              Ver catálogo →
            </button>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                viewport={{ once: true }}
                onClick={() => { navigate(`/product/${product.id}`); window.scrollTo(0, 0); }}
                className="cursor-pointer group bg-[#111] rounded-xl overflow-hidden border border-white/5 hover:border-white/15 transition-all"
              >
                <div className="relative aspect-3/4 overflow-hidden">
                  <img src={product.img} alt={product.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute top-2 right-2 bg-nivis-neon text-black px-1.5 py-0.5 text-[8px] md:text-[10px] font-black">${product.price.toLocaleString()}</div>
                  <div className="absolute top-2 left-2 bg-black/50 backdrop-blur-sm px-1.5 py-0.5 border border-white/10 rounded-sm">
                    <span className="text-[5px] md:text-[7px] font-mono tracking-[0.2em] text-nivis-neon uppercase">{product.category}</span>
                  </div>
                </div>
                <div className="p-3 md:p-4">
                  <h3 className="text-[9px] md:text-xs font-black uppercase tracking-tight truncate mb-0.5">{product.name}</h3>
                  <p className="text-[6px] md:text-[8px] font-mono text-white/20 uppercase tracking-widest truncate">REF: {product.id} // ARCHIVE</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. STATS BAR ── */}
      <section className="relative z-20 py-10 sm:py-12 md:py-20 px-4 md:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-r from-nivis-neon/5 via-transparent to-purple-500/5" />
        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            {[
              { value: '5.000+', label: 'Clientes activos', icon: '👥' },
              { value: '32', label: 'Diseños exclusivos', icon: '🎨' },
              { value: '100%', label: 'Algodón premium', icon: '🧵' },
              { value: 'FREE', label: 'Envío nacional', icon: '🚚' },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-[#111]/60 backdrop-blur-xl border border-white/5 rounded-xl p-4 sm:p-6 md:p-8 text-center hover:border-white/15 transition-all"
              >
                <div className="text-xl sm:text-2xl md:text-3xl mb-2 md:mb-4">{stat.icon}</div>
                <h3 className="text-lg sm:text-xl md:text-3xl font-black tracking-tighter mb-0.5 md:mb-2">{stat.value}</h3>
                <p className="text-[8px] sm:text-[9px] md:text-[10px] font-mono text-white/30 uppercase tracking-widest">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. BRAND PHILOSOPHY ── */}
      <section className="relative z-30 bg-nivis-black py-16 sm:py-24 md:py-40 px-4 md:px-8 border-t border-white/5 overflow-hidden">
        <div className="max-w-[1600px] mx-auto flex flex-col items-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-center"
          >
            <h3 className="text-4xl sm:text-6xl md:text-[100px] lg:text-[120px] font-black uppercase tracking-tighter leading-none mb-6 md:mb-12">
              Basketball<br />Culture<br />Meets<br />Style.
            </h3>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-1.5 bg-nivis-neon mx-auto"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-10 sm:mt-16 md:mt-24 grid grid-cols-3 gap-6 md:gap-12 w-full text-center"
          >
            {[
              { title: 'Innovation', sub: 'Algodón Premium 100%' },
              { title: 'Durability', sub: 'Basketball Culture' },
              { title: 'Vision', sub: 'Archive v1.024' },
            ].map((item, i) => (
              <div key={i} className="space-y-2 md:space-y-4">
                <h4 className="text-[8px] sm:text-[9px] md:text-[10px] font-mono text-nivis-neon uppercase tracking-widest">{item.title}</h4>
                <p className="text-[8px] sm:text-[10px] md:text-xs text-white/40 uppercase font-bold tracking-widest">{item.sub}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── BOTTOM MARQUEE ── */}
      <div className="relative z-30 bg-nivis-neon py-2 text-nivis-black overflow-hidden flex whitespace-nowrap">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="flex gap-8 sm:gap-12 md:gap-20 text-[8px] sm:text-[9px] md:text-[10px] font-black uppercase tracking-widest"
        >
          <span>MALIBU STYLES // BASKETBALL CULTURE // STREETWEAR PREMIUM // HIGH PERFORMANCE APPAREL // </span>
          <span>MALIBU STYLES // BASKETBALL CULTURE // STREETWEAR PREMIUM // HIGH PERFORMANCE APPAREL // </span>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
