import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { productsData } from '../data/productsData';

const ProductDetail = () => {
  const { id } = useParams();
  const product = productsData.find(p => p.id === id);
  const { addToCart } = useCart();
  const [size, setSize] = useState('');
  const [added, setAdded] = useState(false);

  if (!product) return <div className="container" style={{ padding: '80px' }}><h2>Producto no encontrado</h2></div>;

  const handleAdd = () => {
    if(!size) return alert("Selecciona un talle");
    addToCart(product, size);
    setAdded(true);
    setTimeout(() => setAdded(false), 3000);
  };

  return (
    <div className="container" style={{ padding: '60px 20px', display: 'flex', gap: '60px', flexWrap: 'wrap' }}>
      {/* Imagen Izquierda */}
      <div style={{ flex: '1', minWidth: '300px' }}>
        <img src={product.img} alt={product.name} style={{ width: '100%', borderRadius: '12px', objectFit: 'cover' }} />
      </div>

      {/* Detalles Derecha */}
      <div style={{ flex: '1', minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <h1 style={{ fontSize: '3rem', lineHeight: '1.1' }}>{product.name}</h1>
        <p style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--accent-color)' }}>${product.price}</p>
        <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>{product.description}</p>
        
        <div>
          <h4 style={{ marginBottom: '10px' }}>Seleccionar Talle</h4>
          <div style={{ display: 'flex', gap: '10px' }}>
            {['S', 'M', 'L', 'XL'].map(t => (
              <button 
                key={t}
                onClick={() => setSize(t)}
                style={{
                  padding: '10px 20px',
                  borderRadius: '4px',
                  border: size === t ? '2px solid var(--accent-color)' : '1px solid #444',
                  background: size === t ? 'var(--text-main)' : 'var(--bg-secondary)',
                  color: size === t ? 'var(--bg-color)' : 'var(--text-main)',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <button onClick={handleAdd} className="btn btn-accent" style={{ padding: '15px', fontSize: '1.2rem', marginTop: '20px' }}>
          {added ? '¡Agregado al carrito!' : 'Agregar al Carrito'}
        </button>

        <Link to="/shop" style={{ color: 'var(--text-muted)', textDecoration: 'underline', marginTop: '10px' }}>Continuar Comprando</Link>
      </div>
    </div>
  );
};

export default ProductDetail;
