import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import MainLayout from './components/layout/MainLayout';

// Pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import Buzos from './pages/Buzos';
import Novedades from './pages/Novedades';
import ProductDetail from './pages/ProductDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import SobreMi from './pages/SobreMi';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Toaster 
            position="bottom-right"
            toastOptions={{
              style: {
                background: '#1a1a1a',
                color: '#fff',
                border: '1px solid rgba(255,255,255,0.1)',
                fontFamily: 'Space Mono, monospace',
                fontSize: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.1em'
              },
            }}
          />
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/buzos" element={<Buzos />} />
              <Route path="/novedades" element={<Novedades />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/sobre-mi" element={<SobreMi />} />
              <Route path="/auth" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>
            
            {/* Admin routes could go here with a different layout if needed */}
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
