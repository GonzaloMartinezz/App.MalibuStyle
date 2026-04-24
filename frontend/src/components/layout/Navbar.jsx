import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import ManifestDrawer from '../shop/ManifestDrawer';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const [isManifestOpen, setIsManifestOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { cartCount } = useCart();
  const { user, logout } = useAuth();
  const { scrollY } = useScroll();
  const navigate = useNavigate();
  
  const navBg = useTransform(
    scrollY,
    [0, 100],
    ["rgba(10, 10, 10, 0)", "rgba(10, 10, 10, 0.9)"]
  );

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsUserMenuOpen(false);
  };

  const getInitials = (name) => {
    return name ? name.substring(0, 2).toUpperCase() : 'MS';
  };

  return (
    <>
      <motion.nav 
        style={{ backgroundColor: navBg }}
        className="w-full fixed top-0 left-0 z-50 px-6 py-4 flex justify-between items-center backdrop-blur-sm transition-all duration-500 border-b border-white/0"
      >
        <div className="flex items-center gap-10">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="bg-nivis-black h-10 w-10 p-0.5 rounded-sm border border-white/10 group-hover:border-white/40 transition-colors flex items-center justify-center overflow-hidden">
              <img 
                src="/Logo.jpg" 
                alt="Malibu" 
                className="w-full h-full object-cover rounded-sm" 
              />
            </div>
            <span className="text-white font-black tracking-tighter text-xl uppercase">MALIBU</span>
          </Link>

          {/* Technical Nav Links */}
          <div className="hidden lg:flex items-center gap-8">
             <Link to="/shop" className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase hover:text-nivis-neon transition-colors">Remeras</Link>
             <Link to="/buzos" className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase hover:text-nivis-neon transition-colors">Buzos</Link>
             <Link to="/novedades" className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase hover:text-nivis-neon transition-colors">Novedades</Link>
          </div>
        </div>
        
        <div className="flex gap-3 items-center">
          {/* User Section */}
          {user ? (
            <div className="relative">
              <button 
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="w-9 h-9 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-[9px] font-black hover:bg-nivis-neon hover:text-black transition-all"
              >
                {getInitials(user.name || user.email)}
              </button>
              
              <AnimatePresence>
                {isUserMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-4 w-48 bg-[#1a1a1a] border border-white/10 p-2 rounded-md shadow-2xl backdrop-blur-xl"
                  >
                    <div className="px-4 py-3 border-b border-white/5 mb-2">
                       <p className="text-[10px] font-mono text-white/40 uppercase">Authenticated As</p>
                       <p className="text-xs font-bold truncate">{user.email}</p>
                    </div>
                    <button 
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-[10px] font-mono font-bold uppercase hover:bg-white/5 hover:text-red-400 transition-colors flex items-center justify-between"
                    >
                      LOGOUT_SESSION
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" strokeWidth="2"/></svg>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link 
              to="/auth" 
              className="w-9 h-9 bg-white/5 border border-white/10 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" strokeWidth="2"/></svg>
            </Link>
          )}

          {/* Cart Button — SMALLER */}
          <button 
            onClick={() => setIsManifestOpen(true)}
            className="px-5 py-2.5 bg-white text-black text-[10px] font-black uppercase tracking-widest hover:bg-nivis-neon transition-all relative rounded-sm border border-white/20"
          >
            CART {cartCount.toString().padStart(2, '0')}
            {cartCount > 0 && (
               <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-nivis-neon rounded-full border-2 border-black" />
            )}
          </button>
          
          {/* SHOP Button — Icon-only grid like screenshot 2 */}
          <Link 
            to="/shop"
            className="hidden md:flex w-11 h-11 bg-nivis-neon text-black items-center justify-center hover:bg-white transition-all shadow-[0_6px_20px_rgba(212,255,60,0.3)] rounded-sm group"
          >
            <motion.svg 
              className="w-5 h-5" 
              viewBox="0 0 24 24" 
              fill="currentColor"
              whileHover={{ rotate: 90 }}
              transition={{ duration: 0.3 }}
            >
              <rect x="4" y="4" width="4" height="4" rx="0.5" />
              <rect x="10" y="4" width="4" height="4" rx="0.5" />
              <rect x="16" y="4" width="4" height="4" rx="0.5" />
              <rect x="4" y="10" width="4" height="4" rx="0.5" />
              <rect x="10" y="10" width="4" height="4" rx="0.5" />
              <rect x="16" y="10" width="4" height="4" rx="0.5" />
              <rect x="4" y="16" width="4" height="4" rx="0.5" />
              <rect x="10" y="16" width="4" height="4" rx="0.5" />
              <rect x="16" y="16" width="4" height="4" rx="0.5" />
            </motion.svg>
          </Link>
        </div>
      </motion.nav>

      <ManifestDrawer 
        isOpen={isManifestOpen} 
        onClose={() => setIsManifestOpen(false)} 
      />
    </>
  );
}
