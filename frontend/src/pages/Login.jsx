import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return toast.error('Por favor, completa todos los campos.');
    }

    try {
      const { data } = await api.post('/auth/login', { email, password });
      loginUser(data);
      toast.success(`Bienvenido de vuelta, ${data.name || email}`, { icon: '🏀' });
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error al iniciar sesión');
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden font-sans">

      {/* Dark Basketball Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1546519638-68e109498ffc?w=1920&q=80')" }}
      >
        <div className="absolute inset-0 bg-black/75" />
        <div className="absolute inset-0 bg-linear-to-br from-black via-transparent to-black/90" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center text-[10px] font-mono tracking-widest text-white/20 uppercase z-10">
        <span>MALIBU_STYLES // AUTH_GATEWAY</span>
        <span>SECURE_CONNECTION_V2.0</span>
      </div>

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-20 w-full max-w-[480px] mx-6"
      >
        <div className="bg-[#0d0d0d]/90 backdrop-blur-2xl border border-white/10 overflow-hidden shadow-2xl">

          {/* Header with Logo */}
          <div className="p-8 pb-0 flex flex-col items-center">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/10 mb-6">
              <img src="/Logo.jpg" alt="Malibu" className="w-full h-full object-cover" />
            </div>
            <h2 className="text-3xl font-black uppercase tracking-tighter mb-2">Acceso</h2>
            <p className="text-[10px] font-mono text-white/30 uppercase tracking-[0.3em] mb-8">Authentication Required</p>
            <div className="w-full h-px bg-white/5" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-5">
            <div>
              <label className="block text-[10px] font-mono text-white/40 uppercase tracking-widest mb-3">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tucorreo@malibu.com"
                className="w-full bg-white/5 border border-white/10 px-5 py-4 text-sm text-white placeholder:text-white/20 focus:border-nivis-neon focus:outline-none transition-colors font-mono"
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono text-white/40 uppercase tracking-widest mb-3">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-white/5 border border-white/10 px-5 py-4 text-sm text-white placeholder:text-white/20 focus:border-nivis-neon focus:outline-none transition-colors font-mono"
              />
            </div>

            <div className="flex justify-between items-center pt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-3 h-3 accent-nivis-neon" />
                <span className="text-[10px] font-mono text-white/30 uppercase">Remember Session</span>
              </label>
              <span className="text-[10px] font-mono text-nivis-neon uppercase cursor-pointer hover:text-white transition-colors">Forgot?</span>
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-white text-black py-5 text-[11px] font-black uppercase tracking-[0.2em] hover:bg-nivis-neon transition-all mt-4 flex items-center justify-center gap-3"
            >
              INICIAR SESIÓN
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeWidth="2.5" /></svg>
            </motion.button>
          </form>

          {/* Footer */}
          <div className="px-8 pb-8 pt-0">
            <div className="border-t border-white/5 pt-6 text-center">
              <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest">
                ¿No tenés cuenta?{' '}
                <Link to="/register" className="text-nivis-neon font-bold hover:text-white transition-colors">
                  REGISTRATE
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Technical Tag */}
        <div className="mt-4 text-center text-[9px] font-mono text-white/10 uppercase tracking-[0.3em]">
          MALIBU_STYLES_INFRASTRUCTURE_V1.0
        </div>
      </motion.div>

      {/* Decorative Basketball Lines */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-nivis-neon/20 to-transparent" />
    </div>
  );
};

export default Login;
