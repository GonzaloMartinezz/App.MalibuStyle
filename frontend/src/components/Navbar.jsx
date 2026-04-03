import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, User, LogOut, ChevronDown } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { cartItems } = useCart();
  const { user, logoutUser } = useAuth();
  const totalItems = cartItems.reduce((acc, current) => acc + current.qty, 0);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate('/');
  };

  const getInitials = (name) => {
    return name ? name.substring(0, 2).toUpperCase() : 'US';
  };

  return (
    <nav className="navbar">
      <div className="logo" style={{ fontSize: '24px', fontWeight: '900', fontStyle: 'italic', letterSpacing: '-1px' }}>
        <Link to="/">MALIBU.<span style={{ color: 'var(--accent-color)' }}>STYLESS</span></Link>
      </div>

      <ul className="nav-links">
        <li className="nav-item">
          <Link to="/shop?cat=remeras" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            REMERAS <ChevronDown size={16} />
          </Link>
          <ul className="dropdown-menu">
            <li><Link to="/shop?cat=remeras&sz=xl" className="dropdown-item">Remeras XL</Link></li>
            <li><Link to="/shop?cat=remeras&sz=l" className="dropdown-item">Remeras L</Link></li>
            <li><Link to="/shop?cat=remeras&sz=m" className="dropdown-item">Remeras M</Link></li>
            <li><Link to="/shop?cat=remeras&sz=s" className="dropdown-item">Remeras S</Link></li>
          </ul>
        </li>
        <li className="nav-item">
          <Link to="/shop?cat=buzos" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            BUZOS <ChevronDown size={16} />
          </Link>
          <ul className="dropdown-menu">
            <li><Link to="/shop?cat=buzos&sz=xl" className="dropdown-item">Buzos XL</Link></li>
            <li><Link to="/shop?cat=buzos&sz=l" className="dropdown-item">Buzos L</Link></li>
            <li><Link to="/shop?cat=buzos&sz=m" className="dropdown-item">Buzos M</Link></li>
            <li><Link to="/shop?cat=buzos&sz=s" className="dropdown-item">Buzos S</Link></li>
          </ul>
        </li>
        <li className="nav-item">
          <Link to="/shop?cat=novedades">NOVEDADES</Link>
        </li>
        <li className="nav-item">
          <Link to="/#sobre-nosotros">SOBRE NOSOTROS</Link>
        </li>
      </ul>

      <div className="nav-actions" style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            {/* Cículo con letras */}
            <div style={{ 
              width: '40px', height: '40px', borderRadius: '50%', background: 'var(--accent-color)', 
              color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', 
              fontWeight: '900', fontSize: '1rem', boxShadow: '0 0 10px rgba(0, 240, 255, 0.4)' 
            }}>
              {getInitials(user.name || user.email)}
            </div>
            
            <button onClick={handleLogout} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center' }} title="Cerrar sesión">
              <LogOut size={20} />
            </button>
          </div>
        ) : (
          <Link to="/login"><User size={24} /></Link>
        )}
        
        <Link to="/cart" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <ShoppingBag size={24} />
          {totalItems > 0 && (
            <span style={{ position: 'absolute', top: -8, right: -12, background: 'var(--danger-color)', color: 'white', fontSize: '0.7rem', padding: '2px 6px', borderRadius: '50%', fontWeight: 'bold' }}>
              {totalItems}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
