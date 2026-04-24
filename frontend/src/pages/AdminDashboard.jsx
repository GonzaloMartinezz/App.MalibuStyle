import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { productsData, buzosData } from '../data/productsData';

const allProducts = [...productsData, ...buzosData].map(p => ({
  ...p, stock: Math.floor(Math.random() * 30) + 5,
  sizes: { S: Math.floor(Math.random()*10)+1, M: Math.floor(Math.random()*10)+2, L: Math.floor(Math.random()*10)+1, XL: Math.floor(Math.random()*8)+1 },
  status: 'active'
}));

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [products, setProducts] = useState(allProducts);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [newProduct, setNewProduct] = useState({ name:'', price:'', category:'Remeras Basquet', img:'', stock:0 });
  const [showAddForm, setShowAddForm] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== 'admin') { navigate('/auth'); }
  }, [user, navigate]);

  const handleLogout = () => { logout(); navigate('/'); };
  const totalStock = products.reduce((a,p) => a + (p.stock||0), 0);
  const totalValue = products.reduce((a,p) => a + p.price * (p.stock||0), 0);
  const criticalStock = products.filter(p => (p.stock||0) < 8).length;

  const startEdit = (p) => { setEditingId(p.id); setEditForm({ name: p.name, price: p.price, stock: p.stock }); };
  const saveEdit = (id) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...editForm, price: Number(editForm.price), stock: Number(editForm.stock) } : p));
    setEditingId(null);
  };
  const deleteProduct = (id) => setProducts(prev => prev.filter(p => p.id !== id));
  const toggleStatus = (id) => setProducts(prev => prev.map(p => p.id === id ? { ...p, status: p.status === 'active' ? 'paused' : 'active' } : p));
  const addProduct = () => {
    if (!newProduct.name || !newProduct.price) return;
    const np = { ...newProduct, id: `new-${Date.now()}`, price: Number(newProduct.price), stock: Number(newProduct.stock), status:'active',
      sizes:{S:0,M:0,L:0,XL:0}, description:'Producto nuevo', img: newProduct.img || '/IMG1.jpg' };
    setProducts(prev => [np, ...prev]);
    setNewProduct({ name:'', price:'', category:'Remeras Basquet', img:'', stock:0 });
    setShowAddForm(false);
  };

  const tabs = [
    { id:'home', label:'Dashboard', icon:'📊' },
    { id:'inventario', label:'Inventario', icon:'📦' },
    { id:'ventas', label:'Ventas', icon:'💰' },
    { id:'clientes', label:'Clientes', icon:'👥' },
    { id:'config', label:'Configuración', icon:'⚙️' },
  ];

  const s = { card:'bg-[#111] border border-white/5 rounded-xl p-5 md:p-6', label:'text-[9px] font-mono text-white/30 uppercase tracking-widest', val:'text-2xl md:text-3xl font-black mt-1' };

  const HomePanel = () => (
    <div className="space-y-6">
      <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tighter">Dashboard</h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {[
          { label:'Ventas Totales', val:`$${(totalValue*0.3).toLocaleString()}`, color:'text-nivis-neon' },
          { label:'Stock Total', val:totalStock, color:'text-white' },
          { label:'Productos', val:products.length, color:'text-white' },
          { label:'Stock Crítico', val:criticalStock, color:'text-red-400' },
        ].map((c,i) => (
          <div key={i} className={s.card}><p className={s.label}>{c.label}</p><p className={`${s.val} ${c.color}`}>{c.val}</p></div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className={s.card}>
          <h3 className="text-sm font-black uppercase mb-4">Ventas Recientes</h3>
          <div className="space-y-3">{[
            { name:'Remera Vol.3', qty:2, total:'$71.200', time:'Hace 2h' },
            { name:'Buzo Ed.Limitada', qty:1, total:'$55.000', time:'Hace 5h' },
            { name:'Remera Vol.12', qty:3, total:'$108.600', time:'Hace 1d' },
          ].map((sale,i) => (
            <div key={i} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
              <div><p className="text-xs font-bold">{sale.name}</p><p className="text-[9px] text-white/30 font-mono">{sale.time} · {sale.qty}u</p></div>
              <span className="text-sm font-black text-nivis-neon">{sale.total}</span>
            </div>
          ))}</div>
        </div>
        <div className={s.card}>
          <h3 className="text-sm font-black uppercase mb-4">Top Productos</h3>
          <div className="space-y-3">{products.slice(0,5).map((p,i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="text-xs font-black text-white/20 w-5">{i+1}</span>
              <div className="w-8 h-8 rounded overflow-hidden bg-white/5"><img src={p.img} className="w-full h-full object-cover" alt=""/></div>
              <div className="flex-1 min-w-0"><p className="text-xs font-bold truncate">{p.name}</p></div>
              <span className="text-[10px] font-mono text-nivis-neon">{p.stock}u</span>
            </div>
          ))}</div>
        </div>
      </div>
    </div>
  );

  const InventoryPanel = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tighter">Inventario</h1>
        <button onClick={() => setShowAddForm(!showAddForm)} className="bg-nivis-neon text-black px-4 py-2 text-[10px] font-black uppercase tracking-widest hover:bg-white transition-all">
          {showAddForm ? '✕ Cancelar' : '+ Nuevo Producto'}
        </button>
      </div>
      {showAddForm && (
        <div className={`${s.card} border-nivis-neon/30`}>
          <h3 className="text-sm font-black uppercase mb-4">Agregar Producto</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <input placeholder="Nombre" value={newProduct.name} onChange={e => setNewProduct({...newProduct, name:e.target.value})} className="bg-white/5 border border-white/10 px-3 py-2 text-xs focus:border-nivis-neon outline-none"/>
            <input placeholder="Precio" type="number" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price:e.target.value})} className="bg-white/5 border border-white/10 px-3 py-2 text-xs focus:border-nivis-neon outline-none"/>
            <input placeholder="Stock" type="number" value={newProduct.stock} onChange={e => setNewProduct({...newProduct, stock:e.target.value})} className="bg-white/5 border border-white/10 px-3 py-2 text-xs focus:border-nivis-neon outline-none"/>
            <button onClick={addProduct} className="bg-nivis-neon text-black text-[10px] font-black uppercase tracking-widest hover:bg-white transition-all py-2">Guardar</button>
          </div>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px]">
          <thead><tr className="border-b border-white/10">
            {['Producto','Categoría','Precio','Stock','Estado','Acciones'].map(h => (
              <th key={h} className="text-left text-[9px] font-mono text-white/30 uppercase tracking-widest py-3 px-3">{h}</th>
            ))}
          </tr></thead>
          <tbody>{products.map(p => (
            <tr key={p.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
              <td className="py-3 px-3">
                {editingId === p.id ? <input value={editForm.name} onChange={e => setEditForm({...editForm, name:e.target.value})} className="bg-white/5 border border-nivis-neon/50 px-2 py-1 text-xs w-full outline-none"/> :
                <div className="flex items-center gap-2"><div className="w-8 h-8 rounded overflow-hidden bg-white/5 flex-shrink-0"><img src={p.img} className="w-full h-full object-cover" alt=""/></div><span className="text-xs font-bold truncate max-w-[200px]">{p.name}</span></div>}
              </td>
              <td className="py-3 px-3"><span className="text-[9px] font-mono text-white/40 uppercase">{p.category}</span></td>
              <td className="py-3 px-3">
                {editingId === p.id ? <input type="number" value={editForm.price} onChange={e => setEditForm({...editForm, price:e.target.value})} className="bg-white/5 border border-nivis-neon/50 px-2 py-1 text-xs w-20 outline-none"/> :
                <span className="text-xs font-black">${p.price.toLocaleString()}</span>}
              </td>
              <td className="py-3 px-3">
                {editingId === p.id ? <input type="number" value={editForm.stock} onChange={e => setEditForm({...editForm, stock:e.target.value})} className="bg-white/5 border border-nivis-neon/50 px-2 py-1 text-xs w-16 outline-none"/> :
                <span className={`text-xs font-black px-2 py-0.5 rounded ${(p.stock||0) < 8 ? 'bg-red-500/10 text-red-400' : 'bg-green-500/10 text-green-400'}`}>{p.stock||0}u</span>}
              </td>
              <td className="py-3 px-3">
                <button onClick={() => toggleStatus(p.id)} className={`text-[9px] font-mono uppercase px-2 py-1 rounded cursor-pointer ${p.status==='active' ? 'bg-nivis-neon/10 text-nivis-neon' : 'bg-white/5 text-white/30'}`}>
                  {p.status==='active' ? '● Activo' : '○ Pausado'}
                </button>
              </td>
              <td className="py-3 px-3">
                <div className="flex gap-2">
                  {editingId === p.id ? <>
                    <button onClick={() => saveEdit(p.id)} className="text-[9px] font-bold text-nivis-neon hover:text-white transition-colors">✓ Guardar</button>
                    <button onClick={() => setEditingId(null)} className="text-[9px] font-bold text-white/30 hover:text-white transition-colors">✕</button>
                  </> : <>
                    <button onClick={() => startEdit(p)} className="text-[9px] font-bold text-white/40 hover:text-nivis-neon transition-colors">Editar</button>
                    <button onClick={() => deleteProduct(p.id)} className="text-[9px] font-bold text-white/20 hover:text-red-400 transition-colors">Eliminar</button>
                  </>}
                </div>
              </td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  );

  const SalesPanel = () => (
    <div className="space-y-6">
      <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tighter">Ventas</h1>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        {[{ l:'Ingresos Hoy', v:'$126.200' },{ l:'Ingresos Mes', v:'$2.450.000' },{ l:'Ticket Promedio', v:'$42.800' }].map((c,i) => (
          <div key={i} className={s.card}><p className={s.label}>{c.l}</p><p className={`${s.val} text-nivis-neon`}>{c.v}</p></div>
        ))}
      </div>
      <div className={s.card}>
        <h3 className="text-sm font-black uppercase mb-4">Últimas Órdenes</h3>
        <div className="overflow-x-auto"><table className="w-full min-w-[500px]">
          <thead><tr className="border-b border-white/10">
            {['Orden','Cliente','Productos','Total','Estado'].map(h => <th key={h} className="text-left text-[9px] font-mono text-white/30 uppercase tracking-widest py-2 px-3">{h}</th>)}
          </tr></thead>
          <tbody>{[
            { id:'#3847', client:'Sofía V.', items:2, total:'$71.200', status:'Enviado' },
            { id:'#3846', client:'Diego Q.', items:1, total:'$55.000', status:'Preparando' },
            { id:'#3845', client:'Camila R.', items:3, total:'$108.600', status:'Entregado' },
            { id:'#3844', client:'Lucas M.', items:1, total:'$35.600', status:'Enviado' },
          ].map((o,i) => (
            <tr key={i} className="border-b border-white/5">
              <td className="py-3 px-3 text-xs font-bold text-nivis-neon">{o.id}</td>
              <td className="py-3 px-3 text-xs">{o.client}</td>
              <td className="py-3 px-3 text-xs text-white/40">{o.items} items</td>
              <td className="py-3 px-3 text-xs font-black">{o.total}</td>
              <td className="py-3 px-3"><span className={`text-[9px] px-2 py-0.5 rounded font-mono ${o.status==='Entregado'?'bg-green-500/10 text-green-400':o.status==='Enviado'?'bg-blue-500/10 text-blue-400':'bg-yellow-500/10 text-yellow-400'}`}>{o.status}</span></td>
            </tr>
          ))}</tbody>
        </table></div>
      </div>
    </div>
  );

  const ClientsPanel = () => (
    <div className="space-y-6">
      <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tighter">Clientes</h1>
      <div className={s.card}>
        <div className="overflow-x-auto"><table className="w-full min-w-[500px]">
          <thead><tr className="border-b border-white/10">
            {['Cliente','Compras','Valor Total','Última Compra'].map(h => <th key={h} className="text-left text-[9px] font-mono text-white/30 uppercase tracking-widest py-2 px-3">{h}</th>)}
          </tr></thead>
          <tbody>{[
            { name:'Sofía Valdivia', email:'sofi@mail.com', purchases:12, value:'$450.000', last:'Hace 2h' },
            { name:'Diego Quispe', email:'diego@mail.com', purchases:5, value:'$120.000', last:'Hace 1d' },
            { name:'Camila Ríos', email:'cami@mail.com', purchases:23, value:'$890.000', last:'Hace 3d' },
          ].map((c,i) => (
            <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02]">
              <td className="py-3 px-3"><div><p className="text-xs font-bold">{c.name}</p><p className="text-[9px] text-white/30 font-mono">{c.email}</p></div></td>
              <td className="py-3 px-3 text-xs">{c.purchases}</td>
              <td className="py-3 px-3 text-xs font-black text-nivis-neon">{c.value}</td>
              <td className="py-3 px-3 text-[10px] text-white/40">{c.last}</td>
            </tr>
          ))}</tbody>
        </table></div>
      </div>
    </div>
  );

  const ConfigPanel = () => (
    <div className="space-y-6">
      <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tighter">Configuración</h1>
      <div className={s.card}>
        <h3 className="text-sm font-black uppercase mb-4">Info del Negocio</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[{ l:'Nombre', v:'Malibu Style' },{ l:'Email', v:'contacto@malibu.com' },{ l:'Teléfono', v:'+54 11 2345-6789' },{ l:'Ubicación', v:'Buenos Aires, Argentina' }].map((f,i) => (
            <div key={i}><p className={s.label + ' mb-2'}>{f.l}</p><input defaultValue={f.v} className="w-full bg-white/5 border border-white/10 px-3 py-2 text-xs focus:border-nivis-neon outline-none"/></div>
          ))}
        </div>
        <button className="mt-4 bg-nivis-neon text-black px-6 py-2 text-[10px] font-black uppercase tracking-widest hover:bg-white transition-all">Guardar Cambios</button>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-nivis-black text-white font-sans">
      {/* Mobile overlay */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)}/>}
      
      {/* Sidebar */}
      <aside className={`fixed lg:static z-40 top-0 left-0 h-full w-[240px] bg-[#0d0d0d] border-r border-white/5 p-5 flex flex-col transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 rounded overflow-hidden"><img src="/Logo.jpg" className="w-full h-full object-cover" alt=""/></div>
          <span className="font-black text-sm uppercase tracking-tighter">MALIBU <span className="text-nivis-neon">ADMIN</span></span>
        </div>
        <nav className="flex-1 space-y-1">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => { setActiveTab(tab.id); setSidebarOpen(false); }}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-3 transition-all ${activeTab===tab.id ? 'bg-nivis-neon/10 text-nivis-neon' : 'text-white/40 hover:text-white hover:bg-white/5'}`}>
              <span>{tab.icon}</span>{tab.label}
            </button>
          ))}
        </nav>
        <div className="border-t border-white/5 pt-4 space-y-2">
          <button onClick={() => navigate('/')} className="w-full text-left px-3 py-2 text-[10px] font-mono text-white/30 uppercase hover:text-white transition-colors">← Volver al sitio</button>
          <button onClick={handleLogout} className="w-full text-left px-3 py-2 text-[10px] font-mono text-red-400/60 uppercase hover:text-red-400 transition-colors">Cerrar Sesión</button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 min-w-0">
        <div className="sticky top-0 z-20 bg-nivis-black/90 backdrop-blur-xl border-b border-white/5 px-4 md:px-8 py-3 flex items-center justify-between">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden w-8 h-8 flex flex-col items-center justify-center gap-1 bg-white/5 rounded">
            <span className="w-4 h-[1.5px] bg-white block"/><span className="w-4 h-[1.5px] bg-white block"/><span className="w-4 h-[1.5px] bg-white block"/>
          </button>
          <div className="text-[9px] font-mono text-white/20 uppercase tracking-widest">ADMIN // {activeTab.toUpperCase()}</div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-nivis-neon rounded-full animate-pulse"/>
            <span className="text-[9px] font-mono text-white/30 uppercase hidden sm:inline">Online</span>
          </div>
        </div>
        <div className="p-4 md:p-8">
          {activeTab === 'home' && <HomePanel />}
          {activeTab === 'inventario' && <InventoryPanel />}
          {activeTab === 'ventas' && <SalesPanel />}
          {activeTab === 'clientes' && <ClientsPanel />}
          {activeTab === 'config' && <ConfigPanel />}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
