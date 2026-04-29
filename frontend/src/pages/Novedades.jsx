import { motion } from 'framer-motion';
import { productsData, buzosData } from '../data/productsData';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { toast } from 'react-hot-toast';

// Mix of products for "novedades"
const novedadesItems = [
  { ...productsData[0], discount: 20 },
  { ...buzosData[0], discount: 15 },
  { ...productsData[5], discount: 20 },
  { ...buzosData[2], discount: 10 },
  { ...productsData[10], discount: 25 },
  { ...buzosData[4], discount: 20 },
  { ...productsData[15], discount: 15 },
  { ...productsData[20], discount: 20 },
];

export default function Novedades() {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const getDiscountedPrice = (price, discount) => Math.round(price * (1 - discount / 100));

  return (
    <div className="min-h-screen font-sans text-white relative overflow-hidden">

      {/* Green-Yellow Gradient Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-linear-to-br from-nivis-black via-[#0d1a0a] to-nivis-black" />
        <div className="absolute top-0 right-0 w-[60%] h-[60%] bg-nivis-neon/5 blur-[200px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-[#9dcc20]/5 blur-[200px] rounded-full" />
      </div>

      <div className="relative z-10 pt-24 pb-40 px-6">
        <div className="max-w-[1400px] mx-auto">

          {/* HEADER */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <div className="inline-block bg-nivis-neon text-black px-4 py-2 mb-6">
              <span className="text-[11px] font-black uppercase tracking-widest">🔥 OFERTAS & DESCUENTOS</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85]">
              Novedades.
            </h1>
            <p className="text-sm text-white/40 uppercase font-mono tracking-widest mt-6 max-w-xl">
              Aprovechá los descuentos exclusivos en nuestra selección de remeras y buzos premium.
            </p>
            <div className="w-20 h-1 bg-nivis-neon mt-8" />
          </motion.div>

          {/* OFFER BANNER */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12 p-6 md:p-10 rounded-xl border border-nivis-neon/20 bg-linear-to-r from-nivis-neon/10 to-transparent relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-nivis-neon/10 blur-[80px] rounded-full" />
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
              <div>
                <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tighter">Hasta 25% OFF</h3>
                <p className="text-xs text-white/40 font-mono uppercase tracking-widest mt-2">En productos seleccionados · Por tiempo limitado</p>
              </div>
              <div className="text-[80px] font-black text-nivis-neon/20 leading-none select-none">%</div>
            </div>
          </motion.div>

          {/* PRODUCTS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {novedadesItems.map((item, index) => {
              const discountedPrice = getDiscountedPrice(item.price, item.discount);

              return (
                <motion.div
                  key={`${item.id}-${index}`}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.06 }}
                  viewport={{ once: true }}
                  onClick={() => { navigate(`/product/${item.id}`); window.scrollTo(0, 0); }}
                  className="cursor-pointer group bg-[#111] rounded-lg overflow-hidden border border-white/5 hover:border-nivis-neon/30 transition-all"
                >
                  {/* Image */}
                  <div className="relative aspect-3/4 overflow-hidden">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

                    {/* Discount Badge */}
                    <div className="absolute top-3 left-3 bg-nivis-neon text-black px-3 py-1.5 text-[11px] font-black uppercase tracking-wider shadow-lg">
                      -{item.discount}% OFF
                    </div>

                    {/* Category */}
                    <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm px-2.5 py-1 border border-white/10 rounded-sm">
                      <span className="text-[8px] font-mono text-white/60 uppercase tracking-widest">{item.category}</span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-4 space-y-2">
                    <h3 className="text-xs font-bold uppercase tracking-tight truncate">{item.name}</h3>
                    <div className="flex items-baseline gap-3">
                      <span className="text-lg font-black text-nivis-neon">${discountedPrice.toLocaleString()}</span>
                      <span className="text-xs text-white/30 line-through">${item.price.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-nivis-neon rounded-full" />
                      <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest">Disponible</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ── 5. ABOUT THE FOUNDER / CEO CTA ── */}
        <section className="relative z-20 py-32 md:py-52 px-6 overflow-hidden">
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

        {/* ── 6. BIG BRAND PARALLAX ── */}
        <section className="relative z-20 py-32 md:py-60 overflow-hidden flex items-center justify-center">
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
      </div>

      {/* BOTTOM MARQUEE */}
      <div className="relative z-30 bg-nivis-neon py-4 text-nivis-black overflow-hidden flex whitespace-nowrap">
        <div className="flex animate-marquee-slow text-[10px] md:text-xs font-black uppercase tracking-[0.4em]">
          <span>MALIBU STYLESS // BASKETBALL CULTURE // NOVEDADES EXCLUSIVAS // BELGRANO CULTURAL Y DEPORTIVO // </span>
          <span>MALIBU STYLESS // BASKETBALL CULTURE // NOVEDADES EXCLUSIVAS // BELGRANO CULTURAL Y DEPORTIVO // </span>
        </div>
      </div>
    </div>
  );
}

