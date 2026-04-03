import React from 'react';
import { Link } from 'react-router-dom';
import { productsData } from '../data/productsData';

const Shop = () => {
  return (
    <div className="container" style={{ padding: '40px 20px', display: 'flex', gap: '40px' }}>
      {/* Sidebar Filtros */}
      <aside style={{ width: '250px', flexShrink: 0 }}>
        <h3 style={{ marginBottom: '20px', fontSize: '1.2rem', color: 'var(--accent-color)' }}>Filtros</h3>
        
        <div style={{ marginBottom: '20px' }}>
          <h4 style={{ marginBottom: '10px' }}>Categorías</h4>
          <ul style={{ color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <li><label><input type="checkbox" /> Buzos</label></li>
            <li><label><input type="checkbox" defaultChecked /> Remeras Basquet</label></li>
            <li><label><input type="checkbox" /> Accesorios</label></li>
          </ul>
        </div>
      </aside>

      {/* Product Grid */}
      <main style={{ flex: '1' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h2>Colección Exclusiva ({productsData.length})</h2>
          <select style={{ padding: '8px', borderRadius: '8px', border: '1px solid #333', background: 'var(--bg-secondary)', color: 'white' }}>
            <option>Ordenar: Novedades</option>
            <option>Precio: Mayor a Menor</option>
          </select>
        </div>

        <div className="grid">
          {productsData.map(item => (
            <Link to={`/product/${item.id}`} key={item.id} style={{ display: 'block', textDecoration: 'none' }}>
              <div style={{
                background: 'var(--bg-secondary)',
                borderRadius: '12px',
                padding: '20px',
                transition: 'transform 0.3s, box-shadow 0.3s',
                cursor: 'pointer',
                textAlign: 'center',
                color: 'inherit'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.02)'; e.currentTarget.style.boxShadow = '0 0 15px rgba(45, 106, 79, 0.3)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'none'; }}>
                
                <div style={{ 
                  height: '280px', 
                  backgroundColor: '#0a0a0a', 
                  backgroundImage: `url('${item.img}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  marginBottom: '15px',
                  borderRadius: '8px'
                }}></div>

                <h3 style={{ fontSize: '1rem', margin: '10px 0', color: 'var(--text-main)', height: '45px' }}>{item.name}</h3>
                <p style={{ fontWeight: '800', marginTop: '10px', color: 'var(--accent-hover)', fontSize: '1.2rem' }}>${item.price}</p>
                <button className="btn btn-accent" style={{ marginTop: '15px', width: '100%', pointerEvents: 'none' }}>Ver Detalles</button>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Shop;
