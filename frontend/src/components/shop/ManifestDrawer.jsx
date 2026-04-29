import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';

export default function ManifestDrawer({ isOpen, onClose }) {
  const { cart, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-60"
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-nivis-black z-70 flex flex-col font-sans text-white border-l border-white/5 shadow-2xl"
          >
            {/* Header */}
            <div className="p-6 flex justify-between items-center border-b border-white/5">
              <div>
                <h2 className="text-2xl font-black uppercase tracking-tighter">Carrito</h2>
                <p className="text-[9px] font-mono tracking-widest text-white/30 uppercase mt-1">{cartCount} items</p>
              </div>
              <button onClick={onClose} className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="square" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center space-y-4 opacity-20">
                  <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" strokeWidth="1" /></svg>
                  <p className="text-[10px] font-mono tracking-[0.3em] uppercase">Carrito vacío</p>
                </div>
              ) : (
                cart.map((item) => (
                  <motion.div
                    key={`${item.id}-${item.size}`}
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="bg-[#111] rounded-lg border border-white/5 overflow-hidden"
                  >
                    <div className="grid grid-cols-[80px_1fr] gap-0">
                      {/* Thumbnail */}
                      <div className="aspect-square bg-[#1a1a1a] overflow-hidden">
                        <img
                          src={item.img}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Info */}
                      <div className="p-3.5 flex flex-col justify-between min-w-0">
                        <div className="flex justify-between items-start gap-2">
                          <div className="flex-1 min-w-0">
                            <h3 className="text-xs font-black uppercase tracking-tight leading-tight mb-1">{item.name}</h3>
                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                              {item.size && (
                                <span className="text-[8px] font-mono bg-nivis-neon/10 text-nivis-neon px-1.5 py-0.5 rounded uppercase tracking-wider border border-nivis-neon/20">
                                  Talle {item.size}
                                </span>
                              )}
                              <span className="text-[8px] font-mono text-white/30 uppercase tracking-widest">{item.category || 'Producto'}</span>
                            </div>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id, item.size)}
                            className="text-white/20 hover:text-red-400 transition-colors text-[10px] p-1"
                          >✕</button>
                        </div>

                        <div className="flex justify-between items-end mt-3 pt-2 border-t border-white/5">
                          {/* Quantity Controls */}
                          <div className="flex items-center gap-0 border border-white/10 rounded-sm bg-black/20">
                            <button
                              onClick={() => updateQuantity(item.id, -1, item.size)}
                              className="px-2 py-1 text-white/40 hover:text-white text-[10px] font-bold transition-colors"
                            >−</button>
                            <span className="px-2.5 py-1 text-[10px] font-black border-x border-white/10 min-w-[20px] text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, 1, item.size)}
                              className="px-2 py-1 text-white/40 hover:text-white text-[10px] font-bold transition-colors"
                            >+</button>
                          </div>

                          {/* Price */}
                          <div className="text-right ml-2 shrink-0">
                            <p className="text-sm font-black text-nivis-neon tracking-tighter">${(item.price * item.quantity).toLocaleString()}</p>
                            {item.quantity > 1 && (
                              <p className="text-[8px] text-white/20 font-mono tracking-tighter">${item.price.toLocaleString()} c/u</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-white/5 bg-[#050505]">
              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-[10px] tracking-widest uppercase text-white/30 font-mono">
                  <span>Subtotal ({cartCount} items)</span>
                  <span className="text-white font-bold">${cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[10px] tracking-widest uppercase text-white/30 font-mono">
                  <span>Envío</span>
                  <span className="text-nivis-neon font-bold">GRATIS</span>
                </div>
                <div className="flex justify-between text-xl font-black tracking-tighter border-t border-white/5 pt-4 mt-4 uppercase">
                  <span>Total</span>
                  <span>${cartTotal.toLocaleString()}</span>
                </div>
              </div>

              <button
                disabled={cart.length === 0}
                onClick={() => {
                  const message = `Hola! Quiero realizar un pedido:\n\n${cart.map(item => `- ${item.name} (Talle: ${item.size || 'N/A'}) x${item.quantity} - $${(item.price * item.quantity).toLocaleString()}`).join('\n')}\n\n*Total: $${cartTotal.toLocaleString()}*`;
                  window.open(`https://wa.me/543816242482?text=${encodeURIComponent(message)}`, '_blank');
                }}
                className="w-full bg-nivis-neon text-nivis-black font-black uppercase tracking-widest py-4 hover:bg-white transition-all shadow-[0_0_30px_rgba(212,255,60,0.15)] disabled:opacity-30 disabled:cursor-not-allowed text-[11px]"
              >
                FINALIZAR COMPRA
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
