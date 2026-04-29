import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { productsData, buzosData } from '../data/productsData';
import { useCart } from '../context/CartContext';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

const allProducts = [...productsData, ...buzosData];
const bgColors = ['#3a3a4a', '#2a3a4a', '#4a3a3a', '#3a4a3a', '#4a4a3a'];

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);

  const product = allProducts.find(p => p.id === id);

  if (!product) {
    return (
      <div className="h-screen bg-nivis-black flex flex-col items-center justify-center text-white">
        <p className="text-[10px] font-mono uppercase tracking-[0.5em] text-white/30 mb-6">PRODUCT_NOT_FOUND</p>
        <button onClick={() => navigate('/shop')} className="text-nivis-neon text-xs font-mono uppercase tracking-widest hover:underline">
          ← VOLVER AL ARCHIVO
        </button>
      </div>
    );
  }

  const bgColor = bgColors[parseInt(product.id) % bgColors.length] || bgColors[0];
  const isBuzo = product.category === 'Buzos';

  // Suggested products (same category, excluding current)
  const suggested = allProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAdd = () => {
    if (!selectedSize) {
      toast.error('SELECCIONAR TALLE PARA CONTINUAR');
      return;
    }
    addToCart({ ...product, size: selectedSize, quantity });
    toast.success(`${product.name} [${selectedSize}] x${quantity} → CARRITO`);
  };

  return (
    <div className="bg-nivis-black min-h-screen pt-20 pb-32 font-sans text-white">
      
      {/* Breadcrumb */}
      <div className="max-w-[1200px] mx-auto px-6 mb-6">
        <div className="flex items-center gap-2 text-[9px] font-mono text-white/30 uppercase tracking-widest">
          <button onClick={() => navigate('/')} className="hover:text-nivis-neon transition-colors">Home</button>
          <span>/</span>
          <button onClick={() => navigate(isBuzo ? '/buzos' : '/shop')} className="hover:text-nivis-neon transition-colors">
            {isBuzo ? 'Buzos' : 'Remeras'}
          </button>
          <span>/</span>
          <span className="text-white/50">{product.name}</span>
        </div>
      </div>

      {/* Main Product Section */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.9fr] gap-0 rounded-xl overflow-hidden border border-white/10 bg-[#111111] shadow-2xl">
          
          {/* LEFT: Product Image */}
          <div className="relative flex items-center justify-center p-4 lg:p-6 overflow-hidden min-h-[400px] md:min-h-[500px]" style={{ backgroundColor: bgColor }}>
            <motion.img 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              src={product.img} 
              alt={product.name} 
              className="h-full w-full object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.4)] relative z-10 scale-105"
            />
            
            {/* Category Tag */}
            <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md px-3 py-1.5 border border-white/10 rounded-sm z-20">
              <span className="text-[8px] font-mono tracking-[0.2em] text-nivis-neon uppercase">{product.category}</span>
            </div>

            {/* Color Dots */}
            <div className="absolute bottom-4 left-4 flex gap-1.5 z-20">
              <div className="w-2.5 h-2.5 rounded-full bg-[#5b84a1] border border-white/30" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#1a1a1a] border border-white/30" />
              <div className="w-2.5 h-2.5 rounded-full bg-white border border-white/30" />
            </div>
          </div>

          {/* RIGHT: Product Info */}
          <div className="p-6 lg:p-10 flex flex-col justify-between bg-[#0d0d0d] border-l border-white/5">
            <div className="space-y-5">
              {/* Header */}
              <div>
                <span className="text-[9px] font-mono tracking-[0.2em] text-white/20 uppercase block mb-2">
                  REF: {product.id} // {product.category.toUpperCase()}
                </span>
                <h1 className="text-2xl lg:text-3xl font-black uppercase tracking-tighter leading-[0.9] mb-2">
                  {product.name}
                </h1>
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-1.5 h-1.5 bg-nivis-neon rounded-full" />
                  <span className="text-[9px] font-mono text-nivis-neon uppercase tracking-widest">En Stock</span>
                </div>
                <div className="w-10 h-0.5 bg-nivis-neon" />
              </div>

              {/* Description */}
              <p className="text-[13px] text-white/50 leading-relaxed max-w-md">
                {product.description}
              </p>

              {/* Price */}
              <div className="flex justify-between items-baseline border-y border-white/5 py-4">
                <span className="text-3xl font-black tracking-tighter">${product.price.toLocaleString()}</span>
                <span className="text-[9px] font-mono text-white/20 uppercase">Ars</span>
              </div>

              {/* Size Selector */}
              <div>
                <p className="text-[9px] font-mono text-white/30 uppercase tracking-widest mb-2">Seleccionar talle</p>
                <div className="flex gap-2">
                  {['S', 'M', 'L', 'XL'].map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`flex-1 py-2.5 border text-[10px] font-black uppercase tracking-widest transition-all ${
                        selectedSize === size
                          ? 'bg-nivis-neon text-black border-nivis-neon'
                          : 'bg-white/5 border-white/10 hover:border-nivis-neon'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <p className="text-[9px] font-mono text-white/30 uppercase tracking-widest mb-2">Cantidad</p>
                <div className="flex items-center gap-0 border border-white/10 w-fit">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 text-white/40 hover:text-white hover:bg-white/5 transition-all font-bold"
                  >−</button>
                  <span className="px-5 py-2 text-xs font-black border-x border-white/10">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 text-white/40 hover:text-white hover:bg-white/5 transition-all font-bold"
                  >+</button>
                </div>
              </div>

              {/* Selected Summary */}
              <AnimatePresence>
                {selectedSize && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="bg-white/5 border border-white/10 p-3 rounded-sm"
                  >
                    <div className="flex justify-between text-[11px] font-bold">
                      <span className="text-white/50">{product.name} [Talle {selectedSize}]</span>
                      <span className="text-nivis-neon">${(product.price * quantity).toLocaleString()}</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Actions */}
            <div className="mt-8 space-y-2">
              <motion.button 
                onClick={handleAdd}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-white text-black font-black uppercase tracking-widest py-4 hover:bg-nivis-neon transition-all flex items-center justify-center gap-3 text-[10px]"
              >
                AGREGAR AL CARRITO
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
              </motion.button>
              <button 
                onClick={() => navigate(isBuzo ? '/buzos' : '/shop')}
                className="w-full bg-white/5 text-white/40 font-bold uppercase tracking-widest py-3 hover:text-white hover:bg-white/10 transition-all text-[9px]"
              >
                ← VOLVER A {isBuzo ? 'BUZOS' : 'REMERAS'}
              </button>
            </div>
          </div>
        </div>

        {/* Suggested Products */}
        {suggested.length > 0 && (
          <div className="mt-16">
            <h3 className="text-[9px] font-mono tracking-[0.2em] text-nivis-neon uppercase mb-6">TAMBIÉN TE PUEDE INTERESAR</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {suggested.map((item) => (
                <div
                  key={item.id}
                  onClick={() => { navigate(`/product/${item.id}`); window.scrollTo(0, 0); }}
                  className="cursor-pointer group bg-[#111] rounded-lg overflow-hidden border border-white/5 hover:border-white/20 transition-all"
                >
                  <div className="aspect-3/4 overflow-hidden">
                    <img src={item.img} alt={item.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500" />
                  </div>
                  <div className="p-3">
                    <h4 className="text-[10px] font-bold uppercase truncate">{item.name}</h4>
                    <p className="text-xs font-black text-nivis-neon mt-0.5">${item.price.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
