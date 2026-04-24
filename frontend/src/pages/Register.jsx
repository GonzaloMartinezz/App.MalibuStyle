import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      return toast.error('Por favor, completa todos los campos.');
    }

    if (formData.password !== formData.confirmPassword) {
      return toast.error('Las contraseñas no coinciden.');
    }

    try {
      const { data } = await api.post('/auth/register', formData);
      loginUser(data);
      toast.success(`Cuenta creada con éxito. ¡Bienvenido, ${formData.name}!`, { icon: '🔥' });
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error al registrarse');
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden font-sans">
      
      {/* Basketball Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?w=1920&q=80')" }}
      >
        <div className="absolute inset-0 bg-black/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/70" />
      </div>

      {/* Decorative */}
      <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center text-[10px] font-mono tracking-widest text-white/20 uppercase z-10">
        <span>MALIBU_STYLES // NEW_ACCOUNT</span>
        <span>REGISTRATION_GATEWAY_V2</span>
      </div>

      {/* Register Card */}
      <motion.div 
        initial={{ opacity: 0, y: 40, scale: 0.95 }} 
        animate={{ opacity: 1, y: 0, scale: 1 }} 
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-20 w-full max-w-[480px] mx-6"
      >
        <div className="bg-[#0d0d0d]/90 backdrop-blur-2xl border border-white/10 overflow-hidden shadow-2xl">
          
          {/* Header */}
          <div className="p-8 pb-0 flex flex-col items-center">
            <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white/10 mb-5">
              <img src="/Logo.jpg" alt="Malibu" className="w-full h-full object-cover" />
            </div>
            <h2 className="text-2xl font-black uppercase tracking-tighter mb-2">Crear Cuenta</h2>
            <p className="text-[10px] font-mono text-white/30 uppercase tracking-[0.3em] mb-6">New Account Registration</p>
            <div className="w-full h-px bg-white/5" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-4">
            <div>
              <label className="block text-[10px] font-mono text-white/40 uppercase tracking-widest mb-2">Nombre Completo</label>
              <input 
                type="text" 
                value={formData.name} 
                onChange={(e) => setFormData({...formData, name: e.target.value})} 
                placeholder="Ej: Juan Pérez"
                className="w-full bg-white/5 border border-white/10 px-5 py-3.5 text-sm text-white placeholder:text-white/20 focus:border-nivis-neon focus:outline-none transition-colors font-mono"
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono text-white/40 uppercase tracking-widest mb-2">Email</label>
              <input 
                type="email" 
                value={formData.email} 
                onChange={(e) => setFormData({...formData, email: e.target.value})} 
                placeholder="tucorreo@malibu.com"
                className="w-full bg-white/5 border border-white/10 px-5 py-3.5 text-sm text-white placeholder:text-white/20 focus:border-nivis-neon focus:outline-none transition-colors font-mono"
              />
            </div>
            
            <div>
              <label className="block text-[10px] font-mono text-white/40 uppercase tracking-widest mb-2">Contraseña</label>
              <input 
                type="password" 
                value={formData.password} 
                onChange={(e) => setFormData({...formData, password: e.target.value})} 
                placeholder="••••••••"
                className="w-full bg-white/5 border border-white/10 px-5 py-3.5 text-sm text-white placeholder:text-white/20 focus:border-nivis-neon focus:outline-none transition-colors font-mono"
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono text-white/40 uppercase tracking-widest mb-2">Confirmar Contraseña</label>
              <input 
                type="password" 
                value={formData.confirmPassword} 
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})} 
                placeholder="••••••••"
                className="w-full bg-white/5 border border-white/10 px-5 py-3.5 text-sm text-white placeholder:text-white/20 focus:border-nivis-neon focus:outline-none transition-colors font-mono"
              />
            </div>

            <motion.button 
              type="submit" 
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-white text-black py-4 text-[11px] font-black uppercase tracking-[0.2em] hover:bg-nivis-neon transition-all mt-2 flex items-center justify-center gap-3"
            >
              CREAR CUENTA
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" strokeWidth="2.5"/></svg>
            </motion.button>
          </form>

          {/* Footer */}
          <div className="px-8 pb-6 pt-0">
            <div className="border-t border-white/5 pt-4 text-center">
              <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest">
                ¿Ya tenés cuenta?{' '}
                <Link to="/auth" className="text-nivis-neon font-bold hover:text-white transition-colors">
                  INICIAR SESIÓN
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 text-center text-[9px] font-mono text-white/10 uppercase tracking-[0.3em]">
          MALIBU_STYLES_INFRASTRUCTURE_V1.0
        </div>
      </motion.div>

      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-nivis-neon/20 to-transparent" />
    </div>
  );
};

export default Register;
