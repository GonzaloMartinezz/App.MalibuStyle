import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cartItems, removeFromCart } = useCart();
  
  const total = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div className="container" style={{ padding: '80px 20px', minHeight: '80vh' }}>
      <h2 style={{ fontSize: '2.5rem', marginBottom: '40px' }}>Tu Carrito</h2>

      {cartItems.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px', background: 'var(--bg-secondary)', borderRadius: '12px' }}>
          <h3 style={{ color: 'var(--text-muted)' }}>No hay productos en tu carrito.</h3>
          <Link to="/shop">
            <button className="btn btn-accent" style={{ marginTop: '20px' }}>Volver a la Tienda</button>
          </Link>
        </div>
      ) : (
        <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
          <div style={{ flex: '2', minWidth: '300px' }}>
            {cartItems.map((item, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px', background: 'var(--bg-secondary)', marginBottom: '15px', borderRadius: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <img src={item.img} alt={item.name} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' }} />
                  <div>
                    <h4 style={{ fontSize: '1.2rem' }}>{item.name}</h4>
                    <p style={{ color: 'var(--text-muted)' }}>Talle: {item.size}</p>
                    <p style={{ fontWeight: 'bold', marginTop: '5px' }}>${item.price} x {item.qty}</p>
                  </div>
                </div>
                <button onClick={() => removeFromCart(item.id, item.size)} style={{ background: 'transparent', color: 'var(--danger-color)', border: 'none', cursor: 'pointer', fontSize: '1.5rem' }}>✕</button>
              </div>
            ))}
          </div>

          <div style={{ flex: '1', minWidth: '250px', background: 'var(--bg-secondary)', padding: '30px', borderRadius: '12px', height: 'fit-content' }}>
            <h3 style={{ marginBottom: '20px', borderBottom: '1px solid #333', paddingBottom: '10px' }}>Resumen de Compra</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
              <span>Total a pagar:</span>
              <span style={{ fontWeight: 'bold', fontSize: '1.5rem', color: 'var(--accent-hover)' }}>${total}</span>
            </div>
            <Link to="/checkout" style={{ display: 'block' }}>
              <button className="btn btn-accent" style={{ width: '100%', fontSize: '1.2rem' }}>Finalizar Compra</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
