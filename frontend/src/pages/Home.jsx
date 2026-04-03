import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Zap, TrendingUp } from 'lucide-react';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section style={{ height: 'calc(100vh - var(--nav-height))', display: 'flex', alignItems: 'center', background: 'radial-gradient(circle at 50% 50%, #111 0%, #000 100%)', position: 'relative', overflow: 'hidden' }}>
        
        {/* Glow effect */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '600px', height: '600px', background: 'var(--accent-color)', filter: 'blur(200px)', opacity: '0.1', zIndex: 0 }}></div>

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <h1 style={{ fontSize: '5rem', lineHeight: '1', marginBottom: '20px', color: 'white' }}>
              REDEFINE TU<br/><span style={{ color: 'var(--accent-color)', textShadow: '0 0 30px rgba(0, 240, 255, 0.4)' }}>ESTILO URBANO</span>
            </h1>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '40px', maxWidth: '500px' }}>
              Indumentaria de primer nivel. Diseño exclusivo y tecnología aplicada a cada prenda para el mejor rendimiento en cancha y calle.
            </p>
            <div style={{ display: 'flex', gap: '20px' }}>
              <Link to="/shop">
                <button className="btn btn-accent" style={{ padding: '15px 40px', fontSize: '1.2rem' }}>VER COLECCIÓN</button>
              </Link>
              <Link to="/shop">
                <button className="btn" style={{ padding: '15px 40px', fontSize: '1.2rem', background: 'transparent', border: '1px solid var(--accent-color)', color: 'var(--accent-color)' }}>NOVEDADES</button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tech Features Section */}
      <section style={{ padding: '80px 0', background: 'var(--bg-secondary)', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="container" style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
          
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ flex: '1', minWidth: '300px' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>
              CONFECCIÓN<br/>DE ÉLITE
            </h2>
            <div style={{ height: '3px', width: '60px', background: 'var(--accent-color)', marginBottom: '30px' }}></div>
            <p style={{ color: 'var(--text-muted)' }}>
              Tu éxito es nuestra misión. Accedé al catálogo más completo de Malibu Style. Sumate a la comunidad que viste el mejor streetwear del país.
            </p>
          </motion.div>

          <div style={{ flex: '2', minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '30px' }}>
            
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} style={{ display: 'flex', gap: '20px' }}>
              <div style={{ background: '#111', padding: '15px', borderRadius: '8px', height: 'fit-content' }}><Zap color="var(--accent-color)" size={30} /></div>
              <div>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '5px' }}>Materiales de Primer Nivel</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Disfruta de un ambiente diseñado para maximizar tu comodidad con telas de última tecnología.</p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} style={{ display: 'flex', gap: '20px' }}>
              <div style={{ background: '#111', padding: '15px', borderRadius: '8px', height: 'fit-content' }}><Shield color="var(--accent-color)" size={30} /></div>
              <div>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '5px' }}>Protección y Durabilidad</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Guía de talles perfecta y telas de gramaje superior que soportan cualquier ritmo de vida.</p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} style={{ display: 'flex', gap: '20px' }}>
              <div style={{ background: '#111', padding: '15px', borderRadius: '8px', height: 'fit-content' }}><TrendingUp color="var(--accent-color)" size={30} /></div>
              <div>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '5px' }}>Colecciones Exclusivas</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Desde ropa oversize hasta retro NBA, un drop con diseños pensados para inspirar.</p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Promocional Banner: Expertos / Plan a tu medida */}
      <section style={{ padding: '60px 0', background: 'var(--bg-color)' }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          
          {/* Fila 1: Banner Grande Azul Oscuro/Tech */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} style={{ background: 'linear-gradient(135deg, #0a192f 0%, #020c1b 100%)', borderRadius: '20px', padding: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid rgba(0, 240, 255, 0.2)', overflow: 'hidden', position: 'relative' }}>
            <div style={{ position: 'absolute', right: '-10%', top: '-20%', width: '400px', height: '400px', background: 'var(--accent-color)', opacity: '0.05', filter: 'blur(100px)', borderRadius: '50%' }}></div>
            
            <div style={{ maxWidth: '500px', position: 'relative', zIndex: 1 }}>
              <h2 style={{ fontSize: '3rem', color: '#fff', marginBottom: '10px', lineHeight: '1.1' }}>
                EXPERTOS EN LO QUE<br/>
                <span style={{ color: '#4da8da' }}>TE HACE BIEN</span>
              </h2>
              <p style={{ color: '#8892b0', fontSize: '1.1rem', marginBottom: '30px' }}>
                Creada por atletas, diseñada para la calle. Llevá tu rendimiento y outfit al máximo nivel.
              </p>
              <div style={{ display: 'flex', gap: '15px' }}>
                <Link to="/shop"><button className="btn" style={{ background: '#0a192f', color: 'white', border: '1px solid #4da8da' }}>Armar mi outfit →</button></Link>
                <Link to="/register"><button className="btn" style={{ background: 'transparent', color: '#8892b0', border: '1px solid #8892b0' }}>Quiero sumarme →</button></Link>
              </div>
            </div>
            
            <div style={{ display: 'none', '@media(minWidth: 768px)': { display: 'block' }, position: 'relative', zIndex: 1 }}>
               <div style={{ background: '#fff', borderRadius: '16px', padding: '20px', display: 'flex', alignItems: 'center', gap: '15px', color: '#000', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
                  <div style={{ background: '#e6f4ff', padding: '15px', borderRadius: '50%' }}><Zap color="#0052cc" /></div>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '1.2rem', fontFamily: 'Inter' }}>Asesoramiento Online</h4>
                    <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>Encontrá tu talle ideal</p>
                  </div>
               </div>
            </div>
          </motion.div>

          {/* Fila 2: Plan Flex */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} style={{ background: '#4da8da', borderRadius: '20px', padding: '50px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#000' }}>
            <div style={{ maxWidth: '500px' }}>
              <p style={{ fontWeight: 'bold', letterSpacing: '2px', opacity: 0.8, marginBottom: '5px' }}>— CLUB MALIBU</p>
              <h2 style={{ fontSize: '3rem', marginBottom: '20px', lineHeight: '1' }}>
                TU PLAN PREMIUM CON<br/>HASTA UN 25% DE AHORRO
              </h2>
              <Link to="/register"><button className="btn" style={{ background: '#fff', color: '#4da8da', border: 'none', borderRadius: '30px', padding: '12px 30px' }}>Elegí PREMIUM</button></Link>
            </div>
            <div style={{ width: '350px', height: '200px', background: 'url(https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80) center/cover', borderRadius: '12px', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}></div>
          </motion.div>

        </div>
      </section>

    </div>
  );
};

export default Home;
