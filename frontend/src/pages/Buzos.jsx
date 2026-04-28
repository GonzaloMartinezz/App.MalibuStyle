import { motion } from 'framer-motion';
import { buzosData } from '../data/productsData';
import { useNavigate } from 'react-router-dom';

export default function Buzos() {
  const navigate = useNavigate();

  return (
    <div className="bg-nivis-black min-h-screen pt-24 pb-40 font-sans text-white">
      
      {/* HEADER */}
      <div className="max-w-[1400px] mx-auto px-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-[10px] font-mono tracking-[0.5em] text-nivis-neon uppercase block mb-4">MALIBU_STYLES // BUZOS_COLLECTION</span>
          <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-[0.85]">
            Buzos <br />Edición Limitada.
          </h1>
          <div className="w-16 h-1 bg-nivis-neon mt-6" />
          <p className="text-xs text-white/40 uppercase font-mono tracking-widest mt-4 max-w-lg">
            Colección exclusiva de buzos oversize inspirados en la cultura basketball urbana.
          </p>
        </motion.div>
      </div>

      {/* GRID — Compact cards */}
      <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {buzosData.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            viewport={{ once: true }}
            onClick={() => { navigate(`/product/${item.id}`); window.scrollTo(0, 0); }}
            className="cursor-pointer group bg-[#111] rounded-lg overflow-hidden border border-white/5 hover:border-white/15 transition-all"
          >
            {/* Image */}
            <div className="relative aspect-3/4 overflow-hidden">
              <img
                src={item.img}
                alt={item.name}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

              {/* Price Tag */}
              <div className="absolute top-3 right-3 bg-nivis-neon text-black px-3 py-1.5 text-xs font-black">
                ${item.price.toLocaleString()}
              </div>

              {/* Category */}
              <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm px-2.5 py-1 border border-white/10 rounded-sm">
                <span className="text-[8px] font-mono tracking-[0.2em] text-nivis-neon uppercase">{item.category}</span>
              </div>

              {/* Hover CTA */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="bg-white text-black px-6 py-3 text-[10px] font-black uppercase tracking-widest shadow-2xl">
                  VER DETALLES →
                </span>
              </div>
            </div>

            {/* Info */}
            <div className="p-4">
              <h3 className="text-sm font-black uppercase tracking-tight truncate mb-1">{item.name}</h3>
              <p className="text-[9px] font-mono text-white/20 uppercase tracking-widest">
                REF: {item.id.toUpperCase()} // LIMITED
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
