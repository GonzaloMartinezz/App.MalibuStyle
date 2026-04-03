import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState('tarjeta');
  const { cartItems, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const total = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  const handleCheckout = (e) => {
    e.preventDefault();
    if(cartItems.length === 0) {
      toast.error('Tu carrito está vacío');
      return navigate('/shop');
    }

    toast.success('¡Pago Procesado Exitosamente! Preparando tu orden...', { icon: '📦' });
    clearCart();
    // Simulate async clear up and redirect
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  return (
    <div className="container" style={{ padding: '60px 20px', minHeight: 'calc(100vh - var(--nav-height))' }}>
      <h2 style={{ fontSize: '2.5rem', marginBottom: '40px', textTransform: 'uppercase' }}>Pago Seguro</h2>

      <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
        
        {/* Formulario de Pago */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} style={{ flex: '2', minWidth: '300px' }}>
          <form onSubmit={handleCheckout} style={{ background: 'var(--bg-secondary)', padding: '30px', borderRadius: '12px', border: '1px solid #333' }}>
            <h3 style={{ marginBottom: '20px', borderBottom: '1px solid #444', paddingBottom: '10px' }}>Datos de Facturación</h3>
            
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Email de Contacto</label>
              <input type="email" required defaultValue={user?.email || ''} placeholder="tucorreo@mail.com" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #444', background: 'var(--bg-color)', color: 'white', outline: 'none' }} />
            </div>

            <div style={{ marginBottom: '30px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Dirección de Envío</label>
              <input type="text" required placeholder="Calle Inventada 123" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #444', background: 'var(--bg-color)', color: 'white', outline: 'none' }} />
            </div>

            <h3 style={{ marginBottom: '20px', borderBottom: '1px solid #444', paddingBottom: '10px' }}>Medio de Pago</h3>
            <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
              <label style={{ flex: 1, padding: '15px', background: paymentMethod === 'tarjeta' ? 'rgba(0,240,255,0.1)' : 'var(--bg-color)', border: paymentMethod === 'tarjeta' ? '1px solid var(--accent-color)' : '1px solid #444', borderRadius: '8px', cursor: 'pointer', textAlign: 'center', transition: 'all 0.3s' }}>
                <input type="radio" name="payment" value="tarjeta" checked={paymentMethod === 'tarjeta'} onChange={() => setPaymentMethod('tarjeta')} style={{ display: 'none' }} />
                💳 Tarjeta (Crédito/Débito)
              </label>
              <label style={{ flex: 1, padding: '15px', background: paymentMethod === 'efectivo' ? 'rgba(0,240,255,0.1)' : 'var(--bg-color)', border: paymentMethod === 'efectivo' ? '1px solid var(--accent-color)' : '1px solid #444', borderRadius: '8px', cursor: 'pointer', textAlign: 'center', transition: 'all 0.3s' }}>
                <input type="radio" name="payment" value="efectivo" checked={paymentMethod === 'efectivo'} onChange={() => setPaymentMethod('efectivo')} style={{ display: 'none' }} />
                💵 Transferencia / Efectivo
              </label>
            </div>

            {paymentMethod === 'tarjeta' && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} style={{ display: 'flex', flexDirection: 'column', gap: '15px', overflow: 'hidden' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Número de Tarjeta</label>
                  <input type="text" required placeholder="0000 0000 0000 0000" maxLength="19" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #444', background: 'var(--bg-color)', color: 'white', outline: 'none' }} />
                </div>
                <div style={{ display: 'flex', gap: '15px' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>MM/YY</label>
                    <input type="text" required placeholder="12/25" maxLength="5" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #444', background: 'var(--bg-color)', color: 'white', outline: 'none' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>CVC</label>
                    <input type="text" required placeholder="123" maxLength="4" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #444', background: 'var(--bg-color)', color: 'white', outline: 'none' }} />
                  </div>
                </div>
              </motion.div>
            )}

            {paymentMethod === 'efectivo' && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} style={{ background: 'var(--bg-color)', padding: '20px', borderRadius: '8px', border: '1px dashed #555' }}>
                <p style={{ color: 'var(--text-muted)' }}>El pago deberás realizarlo por los medios manuales o al retirar en ventanilla en tucursal. Te enviaremos el CBU / Alias en la orden final.</p>
              </motion.div>
            )}

            <button type="submit" className="btn btn-accent" style={{ marginTop: '30px', width: '100%', fontSize: '1.2rem', padding: '15px' }}>Completar Orden - ${total}</button>
          </form>
        </motion.div>

        {/* Resumen */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} style={{ flex: '1', minWidth: '300px' }}>
          <div style={{ background: 'var(--bg-secondary)', padding: '30px', borderRadius: '12px', border: '1px solid #333', position: 'sticky', top: '100px' }}>
            <h3 style={{ marginBottom: '20px', borderBottom: '1px solid #444', paddingBottom: '10px' }}>En tu Carrito ({cartItems.length})</h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '20px', maxHeight: '300px', overflowY: 'auto' }}>
              {cartItems.map((item, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <img src={item.img} alt="item" style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }}/>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: '0.9rem', lineHeight: '1.2' }}>{item.name}</p>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Talle: {item.size} • Cant: {item.qty}</p>
                  </div>
                  <strong style={{ alignSelf: 'flex-start' }}>${item.price}</strong>
                </li>
              ))}
            </ul>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #444', paddingTop: '15px' }}>
              <span style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>Total:</span>
              <strong style={{ fontSize: '1.5rem', color: 'var(--accent-color)' }}>${total}</strong>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Checkout;
