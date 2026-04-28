import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// ─── TIMELINE DATA ────────────────────────────────────────────────
// Fotos organizadas cronológicamente para narrar la historia del Founder
const chapters = [
  {
    id: 'inicio',
    year: '2012',
    tag: 'EL COMIENZO',
    title: 'La primera\nvez que\ntoqué una\ncancha.',
    body: 'Desde muy chico supe que el básquet era mi vida. Me uní al Club Belgrano Cultural y Deportivo en Tucumán, y desde el primer día dejé todo en la cancha. Con la camiseta número 9 ya sentía que pertenecía a algo más grande.',
    photos: [
      { src: '/2.PNG', caption: 'Primer trofeo. Primera medalla. Belgrano #9.', size: 'hero' },
      { src: '/4.jpg', caption: 'La cancha de Belgrano, mi segundo hogar.', size: 'side' },
    ],
    accent: '#D4FF3C',
  },
  {
    id: 'formativas',
    year: '2016–2019',
    tag: 'CATEGORÍAS FORMATIVAS',
    title: 'El equipo\nlo es todo.',
    body: 'Años de entrenamiento, sacrificio y crecimiento junto a mis compañeros. Las categorías formativas de Belgrano me enseñaron lo más valioso: que ningún campeón se hace solo. La unión del equipo era nuestra mayor fortaleza.',
    photos: [
      { src: '/8.JPG', caption: 'El ritual antes del partido. Belgrano unidos.', size: 'hero' },
      { src: '/6.jpg', caption: 'Partido nocturno en la cancha histórica.', size: 'side' },
    ],
    accent: '#3C9EFF',
  },
  {
    id: 'seleccion',
    year: '2020',
    tag: 'SELECCIÓN TUCUMÁN',
    title: 'Vestir la\ncamiseta\nde mi\nprovincia.',
    body: 'El sueño de cualquier jugador tucumano. Me convocaron para representar a Tucumán y no lo podía creer. Pararse en el centro de la cancha con la camiseta de la selección provincial fue uno de los momentos más importantes de mi vida.',
    photos: [
      { src: '/3.JPG', caption: 'Superdomo La Rioja — Campeón con Tucumán.', size: 'hero' },
      { src: '/5.jpeg', caption: 'Con la copa de Tucumán. El orgullo de la provincia.', size: 'side' },
    ],
    accent: '#FF6B35',
  },
  {
    id: 'primera',
    year: '2021',
    tag: 'DEBUT EN PRIMERA',
    title: 'El día\nque debuté\nen Primera.',
    body: 'Debutar en Primera División con Belgrano CyD fue el resultado de años de trabajo. Pisar ese parqué con las tribunas llenas, con la gente alentando, es una sensación que no se puede describir con palabras. Solo se siente.',
    photos: [
      { src: '/12.JPG', caption: 'Primera División. Belgrano #9. Tribuna llena.', size: 'hero' },
      { src: '/1.jpg', caption: 'Controlando el juego. Liga Tucumana.', size: 'side' },
    ],
    accent: '#D4FF3C',
  },
  {
    id: 'campeon',
    year: '2022',
    tag: 'CAMPEÓN',
    title: 'La noche\nque fuimos\ncampeones.',
    body: 'El campeonato con Belgrano fue la cima de mi carrera como jugador. El esfuerzo de toda una vida cristalizado en ese momento en que el equipo se abraza en el centro de la cancha. Nunca voy a olvidar esa noche.',
    photos: [
      { src: '/18.PNG', caption: '75 Aniversario de Belgrano. Campeones.', size: 'hero' },
      { src: '/17.PNG', caption: 'La celebración en el corazón de la cancha.', size: 'medium' },
      { src: '/9.JPG', caption: 'El abrazo que lo dice todo.', size: 'side' },
    ],
    accent: '#FFD700',
  },
  {
    id: 'familia',
    year: '2022',
    tag: 'LA FAMILIA',
    title: 'Detrás de\ncada trofeo,\nhay amor.',
    body: 'El deporte me enseñó que los logros más importantes no se consiguen solos. Mi familia siempre estuvo en cada partido, en cada entrenamiento, en cada victoria y derrota. Son el motor de todo lo que hago.',
    photos: [
      { src: '/11.JPG', caption: 'Con mamá y el trofeo de campeón. El mejor abrazo.', size: 'hero' },
      { src: '/10.JPG', caption: 'Con el cuerpo técnico de Belgrano CyD.', size: 'side' },
    ],
    accent: '#FF6B9D',
  },
  {
    id: 'internacional',
    year: '2023',
    tag: 'INTERNACIONALES',
    title: 'Cruzando\nfronteras.',
    body: 'La experiencia de representar a Tucumán en torneos internacionales fue transformadora. Competir en Chile con un equipo 3x3 me mostró que el básquet no tiene fronteras y que el esfuerzo siempre lleva más lejos de lo que imaginás.',
    photos: [
      { src: '/16.jpeg', caption: 'Vallenar, Chile — Torneo Internacional 3x3.', size: 'hero' },
      { src: '/13.jpeg', caption: 'Tucumán de noche, campeón en el exterior.', size: 'side' },
    ],
    accent: '#3C9EFF',
  },
  {
    id: 'ceo',
    year: '2024',
    tag: 'FOUNDER & CEO',
    title: 'Del parqué\nal negocio.',
    body: 'Todo lo que aprendí en la cancha — la disciplina, la resiliencia, el trabajo en equipo, la mentalidad ganadora — lo trasladé a Malibu Style. No fundé solo una marca de ropa. Fundé una filosofía de vida.',
    photos: [
      { src: '/14.jpeg', caption: 'Selección Tucumán — El último capítulo antes del primero.', size: 'hero' },
      { src: '/15.jpeg', caption: 'El vestuario. El lugar donde se forja el campeón.', size: 'side' },
    ],
    accent: '#D4FF3C',
    isFinal: true,
  },
];

const stats = [
  { value: '10+', label: 'Años en el deporte' },
  { value: '#9', label: 'Número de siempre' },
  { value: '1er', label: 'Campeonato conquistado' },
  { value: 'TUC', label: 'Selección provincial' },
];

// ─── PHOTO CARD ───────────────────────────────────────────────────
function PhotoCard({ src, caption, size, delay = 0, accent = '#D4FF3C' }) {
  const [loaded, setLoaded] = useState(false);

  const sizeClasses = {
    hero: 'col-span-2 row-span-2 aspect-[4/5] md:aspect-[3/4]',
    medium: 'col-span-1 row-span-1 aspect-square',
    side: 'col-span-1 row-span-1 aspect-[3/4]',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, margin: '-50px' }}
      className={`relative overflow-hidden rounded-2xl md:rounded-3xl group cursor-default ${sizeClasses[size]}`}
      style={{ '--accent': accent }}
    >
      {/* Loading skeleton */}
      {!loaded && (
        <div className="absolute inset-0 bg-white/5 animate-pulse rounded-2xl md:rounded-3xl" />
      )}
      
      <img
        src={src}
        alt={caption}
        onLoad={() => setLoaded(true)}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.5s' }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />
      
      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-0 h-[3px] w-0 group-hover:w-full transition-all duration-700 rounded-full"
        style={{ backgroundColor: accent }}
      />
      
      {/* Caption */}
      <div className="absolute bottom-0 left-0 w-full p-4 md:p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
        <p className="text-[9px] md:text-[10px] font-mono text-white/70 uppercase tracking-[0.2em] leading-relaxed">
          {caption}
        </p>
      </div>
    </motion.div>
  );
}

// ─── CHAPTER SECTION ──────────────────────────────────────────────
function ChapterSection({ chapter, index }) {
  const ref = useRef(null);

  return (
    <section
      ref={ref}
      id={chapter.id}
      className="relative py-20 md:py-32 px-4 sm:px-6 md:px-12 overflow-hidden"
    >
      {/* Chapter number watermark */}
      <div className="absolute -top-8 right-4 md:right-12 text-[120px] md:text-[200px] font-black text-white/[0.03] leading-none select-none pointer-events-none">
        {String(index + 1).padStart(2, '0')}
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* Chapter Header */}
        <motion.div
          initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 md:mb-16 pb-6 border-b border-white/10"
        >
          <div>
            <div className="flex items-center gap-4 mb-3">
              <span className="font-mono text-[10px] tracking-[0.4em] uppercase" style={{ color: chapter.accent }}>
                {chapter.tag}
              </span>
              <div className="h-px w-12 bg-white/20" />
              <span className="font-mono text-[10px] tracking-widest text-white/30">{chapter.year}</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.85] whitespace-pre-line text-white">
              {chapter.title}
            </h2>
          </div>
          <p className="md:max-w-xs text-[11px] md:text-xs text-white/50 font-mono leading-relaxed tracking-widest uppercase md:text-right">
            {chapter.body}
          </p>
        </motion.div>

        {/* Photos Grid */}
        <div className={`grid gap-3 md:gap-4 ${
          chapter.photos.length === 3
            ? 'grid-cols-3 grid-rows-2'
            : 'grid-cols-3'
        }`}>
          {chapter.photos.map((photo, i) => (
            <PhotoCard
              key={i}
              src={photo.src}
              caption={photo.caption}
              size={photo.size}
              delay={i * 0.15}
              accent={chapter.accent}
            />
          ))}
        </div>

        {/* Final CTA for last chapter */}
        {chapter.isFinal && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-16 md:mt-24 text-center"
          >
            <p className="text-[10px] font-mono tracking-[0.4em] text-white/30 uppercase mb-6">
              DE LA CANCHA AL NEGOCIO
            </p>
            <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white mb-8">
              Malibu Style nació<br />de esa misma garra.
            </h3>
          </motion.div>
        )}
      </div>
    </section>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────
export default function SobreMi() {
  const navigate = useNavigate();
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <div className="bg-nivis-black min-h-screen font-sans overflow-x-hidden">

      {/* ── CINEMATIC HERO ── */}
      <section ref={heroRef} className="relative h-screen flex items-end overflow-hidden">
        {/* Parallax BG — Foto más icónica: campeonato con el equipo */}
        <motion.div
          style={{ y: heroY, scale: heroScale }}
          className="absolute inset-0"
        >
          <img
            src="/18.PNG"
            alt="Belgrano Campeón"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-nivis-black via-nivis-black/60 to-nivis-black/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-nivis-black/50 via-transparent to-transparent" />
        </motion.div>

        {/* Hero Text */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 pb-16 md:pb-24"
        >
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-[10px] font-mono tracking-[0.5em] text-nivis-neon uppercase block mb-6">
              FOUNDER & CEO — MALIBU STYLE
            </span>
            <h1 className="text-[15vw] sm:text-[12vw] md:text-[10vw] lg:text-[120px] font-black uppercase tracking-tighter leading-[0.82] text-white mb-8">
              Mi<br />Historia.
            </h1>
            <p className="text-xs md:text-sm font-mono text-white/50 uppercase tracking-[0.3em] max-w-md">
              Belgrano Cultural y Deportivo, Tucumán — Del básquet a la moda
            </p>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 right-8 md:right-12 flex flex-col items-center gap-2"
        >
          <span className="text-[8px] font-mono tracking-[0.3em] text-white/30 uppercase">Scroll</span>
          <div className="w-px h-16 bg-gradient-to-b from-white/30 to-transparent" />
        </motion.div>
      </section>

      {/* ── STATS BAR ── */}
      <div className="relative z-20 bg-[#0A0A0A] border-y border-white/5 py-8 md:py-10 px-4">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x md:divide-white/10">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center md:px-12"
              >
                <span className="text-4xl md:text-5xl font-black text-nivis-neon mb-2">{stat.value}</span>
                <span className="text-[9px] font-mono text-white/40 uppercase tracking-[0.3em]">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── INTRO QUOTE ── */}
      <section className="relative py-20 md:py-32 px-4 sm:px-6 md:px-12 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,255,60,0.04)_0%,transparent_70%)] pointer-events-none" />
        <div className="max-w-[1000px] mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <span className="text-[80px] md:text-[120px] text-nivis-neon/20 font-black leading-none block mb-4">"</span>
            <blockquote className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tighter text-white leading-[1.1] -mt-12">
              Toda mi vida jugué al básquet. Ese deporte no solo me hizo jugador, me hizo persona.
            </blockquote>
            <div className="mt-8 flex items-center justify-center gap-4">
              <div className="h-px w-16 bg-nivis-neon/40" />
              <span className="text-[10px] font-mono text-nivis-neon uppercase tracking-[0.3em]">Founder, Malibu Style</span>
              <div className="h-px w-16 bg-nivis-neon/40" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CHAPTERS ── */}
      {chapters.map((chapter, index) => (
        <ChapterSection key={chapter.id} chapter={chapter} index={index} />
      ))}

      {/* ── BOTTOM CTA ── */}
      <section className="relative py-24 md:py-40 px-4 overflow-hidden bg-[#050505]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,255,60,0.06)_0%,transparent_70%)] pointer-events-none" />
        <div className="max-w-[1400px] mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <span className="text-[10px] font-mono tracking-[0.5em] text-nivis-neon uppercase block mb-6">
              LA SIGUIENTE JUGADA
            </span>
            <h2 className="text-5xl sm:text-7xl md:text-[100px] font-black uppercase tracking-tighter leading-[0.85] text-white mb-12">
              Ahora<br />viste con<br />la misma<br />garra.
            </h2>
            <button
              onClick={() => navigate('/shop')}
              className="group inline-flex items-center gap-4 bg-nivis-neon text-nivis-black px-8 py-4 md:px-12 md:py-5 rounded-full font-black text-xs md:text-sm uppercase tracking-[0.3em] hover:bg-white transition-all duration-300"
            >
              Ver la Colección
              <span className="transform group-hover:translate-x-2 transition-transform duration-300">→</span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* ── BOTTOM TICKER ── */}
      <div className="relative bg-nivis-neon py-3 text-nivis-black overflow-hidden flex whitespace-nowrap">
        <div className="flex animate-marquee-slow text-[10px] font-black uppercase tracking-[0.3em]">
          <span>BELGRANO CULTURAL Y DEPORTIVO // TUCUMÁN, ARG // PRIMERA DIVISIÓN // CAMPEÓN // SELECCIÓN PROVINCIAL // MALIBU STYLE // </span>
          <span>BELGRANO CULTURAL Y DEPORTIVO // TUCUMÁN, ARG // PRIMERA DIVISIÓN // CAMPEÓN // SELECCIÓN PROVINCIAL // MALIBU STYLE // </span>
          <span>BELGRANO CULTURAL Y DEPORTIVO // TUCUMÁN, ARG // PRIMERA DIVISIÓN // CAMPEÓN // SELECCIÓN PROVINCIAL // MALIBU STYLE // </span>
        </div>
      </div>

    </div>
  );
}
