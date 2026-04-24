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
      <div className="max-w-[1500px] mx-auto px-6 mb-8">
        <div className="flex items-center gap-2 text-[10px] font-mono text-white/30 uppercase tracking-widest">
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
      <div className="max-w-[1500px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-0 rounded-xl overflow-hidden border border-white/10 bg-[#111111] shadow-2xl">
          
          {/* LEFT: Product Image */}
          <div className="relative flex items-center justify-center p-8 lg:p-16 overflow-hidden" style={{ backgroundColor: bgColor }}>
            <motion.img 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              src={product.img} 
              alt={product.name} 
              className="max-h-[70vh] w-auto object-contain drop-shadow-[0_30px_50px_rgba(0,0,0,0.3)] relative z-10"
            />
            
            {/* Category Tag */}
            <div className="absolute top-6 left-6 bg-black/50 backdrop-blur-md px-4 py-2 border border-white/10 rounded-sm z-20">
              <span className="text-[9px] font-mono tracking-[0.3em] text-nivis-neon uppercase">{product.category}</span>
            </div>

            {/* Color Dots */}
            <div className="absolute bottom-6 left-6 flex gap-2 z-20">
              <div className="w-3 h-3 rounded-full bg-[#5b84a1] border-2 border-white/30" />
              <div className="w-3 h-3 rounded-full bg-[#1a1a1a] border-2 border-white/30" />
              <div className="w-3 h-3 rounded-full bg-white border-2 border-white/30" />
            </div>
          </div>

          {/* RIGHT: Product Info */}
          <div className="p-8 lg:p-12 flex flex-col justify-between bg-[#0d0d0d] border-l border-white/5">
            <div className="space-y-6">
              {/* Header */}
              <div>
                <span className="text-[10px] font-mono tracking-[0.3em] text-white/20 uppercase block mb-3">
                  REF: {product.id} // {product.category.toUpperCase()}
                </span>
                <h1 className="text-3xl lg:text-4xl font-black uppercase tracking-tighter leading-[0.9] mb-3">
                  {product.name}
                </h1>
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-2 h-2 bg-nivis-neon rounded-full" />
                  <span className="text-[10px] font-mono text-nivis-neon uppercase tracking-widest">In Stock</span>
                </div>
                <div className="w-12 h-1 bg-nivis-neon" />
              </div>

              {/* Description */}
              <p className="text-sm text-white/50 leading-relaxed">
                {product.description}
              </p>

              {/* Price */}
              <div className="flex justify-between items-baseline border-y border-white/5 py-5">
                <span className="text-4xl font-black tracking-tighter">${product.price.toLocaleString()}</span>
                <span className="text-[10px] font-mono text-white/20 uppercase">Precio unitario</span>
              </div>

              {/* Size Selector */}
              <div>
                <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest mb-3">Seleccionar talle</p>
                <div className="flex gap-3">
                  {['S', 'M', 'L', 'XL'].map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`flex-1 py-3 border text-[11px] font-black uppercase tracking-widest transition-all ${
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
                <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest mb-3">Cantidad</p>
                <div className="flex items-center gap-0 border border-white/10 w-fit">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-5 py-3 text-white/40 hover:text-white hover:bg-white/5 transition-all font-bold"
                  >−</button>
                  <span className="px-6 py-3 text-sm font-black border-x border-white/10">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-5 py-3 text-white/40 hover:text-white hover:bg-white/5 transition-all font-bold"
                  >+</button>
                </div>
              </div>

              {/* Selected Summary */}
              <AnimatePresence>
                {selectedSize && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-white/5 border border-white/10 p-4 rounded-sm"
                  >
                    <p className="text-[10px] font-mono text-nivis-neon uppercase tracking-widest mb-2">Resumen de selección</p>
                    <div className="flex justify-between text-xs">
                      <span className="text-white/50">{product.name}</span>
                      <span className="font-bold">Talle {selectedSize} × {quantity}</span>
                    </div>
                    <div className="flex justify-between text-sm font-black mt-2 pt-2 border-t border-white/5">
                      <span>Total</span>
                      <span className="text-nivis-neon">${(product.price * quantity).toLocaleString()}</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Actions */}
            <div className="mt-8 space-y-3">
              <motion.button 
                onClick={handleAdd}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-white text-black font-black uppercase tracking-[0.15em] py-5 hover:bg-nivis-neon transition-all flex items-center justify-center gap-3 text-[11px]"
              >
                AGREGAR AL CARRITO
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
              </motion.button>
              <button 
                onClick={() => navigate(isBuzo ? '/buzos' : '/shop')}
                className="w-full bg-white/5 text-white font-bold uppercase tracking-widest py-4 hover:bg-white/10 transition-all text-[11px]"
              >
                ← VOLVER A {isBuzo ? 'BUZOS' : 'REMERAS'}
              </button>
            </div>
          </div>
        </div>

        {/* Suggested Products */}
        {suggested.length > 0 && (
          <div className="mt-20">
            <h3 className="text-[10px] font-mono tracking-[0.3em] text-nivis-neon uppercase mb-8">TAMBIÉN TE PUEDE INTERESAR</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {suggested.map((item) => (
                <div
                  key={item.id}
                  onClick={() => { navigate(`/product/${item.id}`); window.scrollTo(0, 0); }}
                  className="cursor-pointer group bg-[#111] rounded-lg overflow-hidden border border-white/5 hover:border-white/20 transition-all"
                >
                  <div className="aspect-square overflow-hidden">
                    <img src={item.img} alt={item.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500" />
                  </div>
                  <div className="p-4">
                    <h4 className="text-xs font-bold uppercase truncate">{item.name}</h4>
                    <p className="text-sm font-black text-nivis-neon mt-1">${item.price.toLocaleString()}</p>
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
