import { motion } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { toast } from 'react-hot-toast';
import { productsData } from '../../data/productsData';
import { useNavigate } from 'react-router-dom';

export default function Catalog() {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (e, item) => {
    e.stopPropagation();
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      img: item.img,
      quantity: 1
    });
    toast.success(`${item.name} ADDED TO MANIFEST`);
  };

  const handleNavigate = (id) => {
    navigate(`/product/${id}`);
    window.scrollTo(0, 0);
  };

  return (
    <section className="bg-nivis-black min-h-screen pt-24 pb-40 px-4 md:px-8 font-sans text-white">
      <div className="max-w-[1500px] mx-auto">
        
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <span className="text-[10px] font-mono tracking-[0.5em] text-nivis-neon uppercase block mb-4">MALIBU_STYLES // REMERAS_ARCHIVE</span>
          <div className="flex justify-between items-end">
            <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85]">
              Remeras <br />Colección.
            </h1>
            <div className="text-right hidden md:block">
              <p className="text-[10px] font-mono text-white/20 uppercase tracking-widest">{productsData.length} Units in Archive</p>
              <div className="w-3 h-3 bg-nivis-neon inline-block mt-2" />
            </div>
          </div>
          <div className="w-20 h-1 bg-nivis-neon mt-8" />
        </motion.div>

        {/* GRID — 2 columns, premium cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {productsData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: (index % 2) * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              onClick={() => handleNavigate(item.id)}
              className="group cursor-pointer bg-[#111111] rounded-xl overflow-hidden border border-white/5 hover:border-white/15 transition-all duration-500"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden bg-[#1a1a1a]">
                <img 
                  src={item.img} 
                  alt={item.name} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Quick Add Button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={(e) => handleAddToCart(e, item)}
                    className="bg-white text-black px-8 py-4 text-[10px] font-black uppercase tracking-widest hover:bg-nivis-neon transition-colors shadow-2xl"
                  >
                    QUICK ADD
                  </button>
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm px-3 py-1.5 border border-white/10 rounded-sm">
                  <span className="text-[9px] font-mono tracking-[0.2em] text-white/60 uppercase">{item.category}</span>
                </div>

                {/* Arrow */}
                <div className="absolute top-4 right-4 w-8 h-8 bg-white/0 group-hover:bg-white rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100">
                  <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M7 17L17 7M17 7H7M17 7v10" strokeWidth="2"/></svg>
                </div>
              </div>

              {/* Info Bar */}
              <div className="p-6 flex justify-between items-start gap-4">
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-black uppercase tracking-tight truncate mb-1">{item.name}</h3>
                  <p className="text-[10px] font-mono text-white/20 uppercase">Ref: UNIT_0{item.id} // {item.category}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-lg font-black tracking-tight">${item.price.toLocaleString()}</p>
                  <p className="text-[9px] font-mono text-nivis-neon uppercase tracking-widest flex items-center justify-end gap-1">
                    <span className="w-1.5 h-1.5 bg-nivis-neon rounded-full inline-block" /> IN_STOCK
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
