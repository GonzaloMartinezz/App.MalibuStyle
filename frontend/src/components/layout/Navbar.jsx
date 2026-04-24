import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import ManifestDrawer from '../shop/ManifestDrawer';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const [isManifestOpen, setIsManifestOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartCount } = useCart();
  const { user, logout } = useAuth();
  const { scrollY } = useScroll();
  const navigate = useNavigate();
  const location = useLocation();
  
  const isAuthPage = location.pathname === '/auth' || location.pathname === '/register';

  const navBg = useTransform(
    scrollY,
    [0, 100],
    ["rgba(10, 10, 10, 0)", "rgba(10, 10, 10, 0.95)"]
  );

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsUserMenuOpen(false);
  };

  const getInitials = (name) => {
    return name ? name.substring(0, 2).toUpperCase() : 'MS';
  };

  const navLinks = [
    { to: '/shop', label: 'Remeras' },
    { to: '/buzos', label: 'Buzos' },
    { to: '/novedades', label: 'Novedades' },
  ];

  return (
    <>
      <motion.nav 
        style={{ backgroundColor: navBg }}
        className="w-full fixed top-0 left-0 z-50 px-4 md:px-6 py-3 md:py-4 flex justify-between items-center backdrop-blur-sm border-b border-white/0"
      >
        {/* LEFT: Logo + Links */}
        <div className="flex items-center gap-6 md:gap-10">
          <Link to="/" className="flex items-center gap-2 md:gap-3 group" onClick={() => setIsMobileMenuOpen(false)}>
            <div className="bg-nivis-black h-9 w-9 md:h-10 md:w-10 p-0.5 rounded-sm border border-white/10 group-hover:border-white/40 transition-colors flex items-center justify-center overflow-hidden">
              <img 
                src="/Logo.jpg" 
                alt="Malibu" 
                className="w-full h-full object-cover rounded-sm" 
              />
            </div>
            <span className="text-white font-black tracking-tighter text-lg md:text-xl uppercase">MALIBU</span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map(link => (
              <Link 
                key={link.to}
                to={link.to} 
                className={`text-[10px] font-mono font-bold tracking-[0.2em] uppercase transition-colors ${
                  location.pathname === link.to ? 'text-nivis-neon' : 'hover:text-nivis-neon'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        
        {/* RIGHT: Actions */}
        <div className="flex gap-2 md:gap-3 items-center">
          {/* User Section — ALWAYS visible */}
          {user ? (
            <div className="relative">
              <button 
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="w-8 h-8 md:w-9 md:h-9 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-[8px] md:text-[9px] font-black hover:bg-nivis-neon hover:text-black transition-all"
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
                    {user.role === 'admin' && (
                      <button 
                        onClick={() => { navigate('/admin'); setIsUserMenuOpen(false); }}
                        className="w-full text-left px-4 py-2 text-[10px] font-mono font-bold uppercase hover:bg-white/5 hover:text-nivis-neon transition-colors flex items-center justify-between mb-1"
                      >
                        PANEL ADMIN
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" strokeWidth="1.5"/><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeWidth="1.5"/></svg>
                      </button>
                    )}
                    <button 
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-[10px] font-mono font-bold uppercase hover:bg-white/5 hover:text-red-400 transition-colors flex items-center justify-between"
                    >
                      CERRAR SESIÓN
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" strokeWidth="2"/></svg>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link 
              to="/auth" 
              className="w-8 h-8 md:w-9 md:h-9 bg-white/5 border border-white/10 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all"
            >
              <svg className="w-3.5 h-3.5 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" strokeWidth="2"/></svg>
            </Link>
          )}

          {/* Cart Button — HIDDEN on auth pages */}
          {!isAuthPage && (
            <button 
              onClick={() => setIsManifestOpen(true)}
              className="px-3 py-2 md:px-5 md:py-2.5 bg-white text-black text-[9px] md:text-[10px] font-black uppercase tracking-widest hover:bg-nivis-neon transition-all relative rounded-sm border border-white/20"
            >
              <span className="hidden sm:inline">CART </span>{cartCount.toString().padStart(2, '0')}
              {cartCount > 0 && (
                 <span className="absolute -top-1 -right-1 w-2 h-2 md:w-2.5 md:h-2.5 bg-nivis-neon rounded-full border-2 border-black" />
              )}
            </button>
          )}
          
          {/* SHOP Button — HIDDEN on auth pages + mobile */}
          {!isAuthPage && (
            <Link 
              to="/shop"
              className="hidden md:flex w-10 h-10 md:w-11 md:h-11 bg-nivis-neon text-black items-center justify-center hover:bg-white transition-all shadow-[0_6px_20px_rgba(212,255,60,0.3)] rounded-sm group"
            >
              <motion.svg 
                className="w-4 h-4 md:w-5 md:h-5" 
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
          )}

          {/* Mobile Hamburger — visible only on small screens */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5 bg-white/5 rounded-sm border border-white/10 hover:bg-white/10 transition-all"
          >
            <motion.span 
              animate={isMobileMenuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
              className="w-4 h-[1.5px] bg-white block"
            />
            <motion.span 
              animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="w-4 h-[1.5px] bg-white block"
            />
            <motion.span 
              animate={isMobileMenuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
              className="w-4 h-[1.5px] bg-white block"
            />
          </button>
        </div>
      </motion.nav>

      {/* MOBILE MENU — fullscreen overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-nivis-black/98 backdrop-blur-xl flex flex-col items-center justify-center gap-8 lg:hidden"
          >
            {navLinks.map((link, idx) => (
              <motion.div
                key={link.to}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Link
                  to={link.to}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-3xl font-black uppercase tracking-tighter transition-colors ${
                    location.pathname === link.to ? 'text-nivis-neon' : 'text-white hover:text-nivis-neon'
                  }`}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <div className="w-12 h-0.5 bg-white/10 my-2" />
            {!user && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Link
                  to="/auth"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-bold uppercase tracking-widest text-white/40 hover:text-nivis-neon transition-colors"
                >
                  Iniciar Sesión
                </Link>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <ManifestDrawer 
        isOpen={isManifestOpen} 
        onClose={() => setIsManifestOpen(false)} 
      />
    </>
  );
}
