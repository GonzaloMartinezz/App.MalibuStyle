import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      return toast.error('Debes completar todos los campos asignados');
    }
    if (password.length < 6) {
      return toast.error('La contraseña requiere tener 6 letras mínimos');
    }
    
    // Simulate API Register
    loginUser({ email, name });
    toast.success('Cuenta creada exitosamente. ¡Bienvenido a Malibu Style!', { style: { background: 'var(--accent-color)', color: '#000' }});
    navigate('/');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }} 
      animate={{ opacity: 1, scale: 1 }} 
      transition={{ duration: 0.5 }}
      style={{ display: 'flex', height: 'calc(100vh - var(--nav-height))', alignItems: 'center', justifyContent: 'center' }}
    >
      <div style={{ background: 'rgba(15,15,15,0.7)', backdropFilter: 'blur(10px)', padding: '50px', borderRadius: '16px', width: '100%', maxWidth: '420px', border: '1px solid rgba(255,255,255,0.1)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px', fontSize: '2.5rem', fontWeight: '900', letterSpacing: '-1px' }}>REGISTRO</h2>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Nombre Completo</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ej: Juan Pérez" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #333', background: 'var(--bg-color)', color: 'var(--text-main)', outline: 'none' }} />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tucorreo@ejemplo.com" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #333', background: 'var(--bg-color)', color: 'var(--text-main)', outline: 'none' }} />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Contraseña</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="********" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #333', background: 'var(--bg-color)', color: 'var(--text-main)', outline: 'none' }} />
          </div>

          <button type="submit" className="btn btn-accent" style={{ marginTop: '10px', width: '100%', fontSize: '1.1rem' }}>Crear Cuenta</button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '20px', color: 'var(--text-muted)' }}>
          ¿Ya tienes cuenta? <Link to="/login" style={{ color: 'var(--accent-color)', fontWeight: 'bold' }}>Inicia Sesión</Link>
        </p>
      </div>
    </motion.div>
  );
};

export default Register;
