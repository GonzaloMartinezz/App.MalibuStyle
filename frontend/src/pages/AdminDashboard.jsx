import React, { useState } from 'react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, Legend } from 'recharts';
import { User, LogOut, Search, PlusCircle, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('home');
    const { logoutUser } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logoutUser();
        navigate('/');
    };

    // --- SUB-COMPONENT: Estadísticas / Resultados (Basado en imagen Resultados) ---
    const StatisticsPanel = () => {
        const miniPieData = [{ name: 'A', value: 80 }, { name: 'B', value: 20 }];
        return (
            <div>
                <h1 style={{ marginBottom: '30px', fontSize: '2rem', color: 'var(--text-main)' }}>Resultados y Estadísticas</h1>
                
                <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
                    <select style={{ padding: '10px 20px', borderRadius: '8px', background: 'var(--bg-secondary)', color: 'var(--text-muted)', border: '1px solid #333' }}><option>Mes Actual</option></select>
                    <select style={{ padding: '10px 20px', borderRadius: '8px', background: 'var(--bg-secondary)', color: 'var(--text-muted)', border: '1px solid #333' }}><option>Sucursal Central</option></select>
                </div>

                <div style={{ background: 'var(--bg-secondary)', padding: '30px', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '30px' }}>
                    <h3 style={{ textAlign: 'center', marginBottom: '20px', color: 'var(--text-muted)' }}>Resultados Generales de Engagement</h3>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '40px' }}>
                        <div style={{ background: 'var(--bg-color)', padding: '30px', borderRadius: '12px', border: '1px solid #333', textAlign: 'center', width: '200px' }}>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '10px' }}>Visitas al Shop (Miles)</p>
                            <h2 style={{ fontSize: '3rem', color: 'var(--accent-color)' }}>38</h2>
                        </div>
                        <div style={{ background: 'var(--bg-color)', padding: '30px', borderRadius: '12px', border: '1px solid #333', textAlign: 'center', width: '200px' }}>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '10px' }}>Conversión de Compra</p>
                            <h2 style={{ fontSize: '3rem', color: '#825ee4' }}>29%</h2>
                        </div>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
                    {[
                        { title: 'Satisfacción Retorno', val: '4.88' },
                        { title: 'Devoluciones', val: '1.2' },
                        { title: 'Calidad Entregas', val: '4.95' },
                        { title: 'Fidelización', val: '3.25' }
                    ].map((item, idx) => (
                        <div key={idx} style={{ background: 'var(--bg-secondary)', padding: '20px', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '15px', height: '40px' }}>{item.title}</p>
                            <ResponsiveContainer width="100%" height={120}>
                                <PieChart>
                                    <Pie data={miniPieData} cx="50%" cy="50%" innerRadius={35} outerRadius={50} dataKey="value">
                                        <Cell fill="var(--accent-color)" />
                                        <Cell fill="#333" />
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                            <h3 style={{ marginTop: '-75px', marginBottom: '55px', fontSize: '1.5rem' }}>{item.val}</h3>
                            <a href="#" style={{ color: 'var(--accent-hover)', fontSize: '0.8rem' }}>🔍 Ver detalle</a>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    // --- SUB-COMPONENT: Clientes (Basado en imagen Pacientes) ---
    const ClientsPanel = () => {
        const [search, setSearch] = useState('');
        return (
            <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <h1 style={{ fontSize: '2rem', color: 'var(--text-main)' }}>Todos mis clientes</h1>
                        <span style={{ color: 'var(--text-muted)', fontSize: '1.2rem', paddingLeft: '20px', borderLeft: '2px solid #333' }}>87 clientes registrados</span>
                    </div>
                    <button className="btn btn-accent" style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1rem' }}>
                        <PlusCircle size={20} /> Nuevo Cliente
                    </button>
                </div>

                {/* Filtros Bar */}
                <div style={{ display: 'flex', gap: '20px', marginBottom: '30px', background: 'var(--bg-secondary)', padding: '15px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ flex: 1, position: 'relative' }}>
                        <Search style={{ position: 'absolute', left: '15px', top: '12px', color: '#888' }} size={20} />
                        <input type="text" placeholder="Buscar por nombre o correo electrónico..." value={search} onChange={e => setSearch(e.target.value)} style={{ width: '100%', background: 'var(--bg-color)', border: '1px solid #333', padding: '12px 15px 12px 45px', borderRadius: '8px', color: 'white', outline: 'none' }} />
                    </div>
                    <button style={{ background: 'var(--bg-color)', border: '1px solid #333', padding: '0 20px', borderRadius: '8px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                        <Filter size={18} /> Filtrar
                    </button>
                </div>

                {/* Tabla */}
                <div style={{ background: 'var(--bg-secondary)', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead style={{ background: '#1a2235', color: '#a0aec0' }}>
                            <tr>
                                <th style={{ padding: '20px' }}>Cliente</th>
                                <th style={{ padding: '20px' }}>Última Compra</th>
                                <th style={{ padding: '20px' }}>LTV (Lifetime Value)</th>
                                <th style={{ padding: '20px' }}>Fuente de Ingreso</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                { name: 'Sofía Valdivia García', email: 'sofi@mail.com', last: 'Hace 9 meses', value: '450.000', source: 'Instagram' },
                                { name: 'Diego Quispe López', email: 'diego@mail.com', last: 'Hace 11 meses', value: '120.000', source: 'Organico' },
                                { name: 'Camila Ríos', email: 'cami@mail.com', last: 'Hace 3 días', value: '890.000', source: 'TikTok' },
                            ].map((client, idx) => (
                                <tr key={idx} style={{ borderBottom: '1px solid #333', transition: 'background 0.2s', cursor: 'pointer' }} onMouseEnter={e => e.currentTarget.style.background = '#1a1a1a'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                                    <td style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #00F0FF, #4da8da)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', fontWeight: 'bold' }}>
                                            {client.name.substring(0, 2).toUpperCase()}
                                        </div>
                                        <div>
                                            <p style={{ color: 'var(--accent-color)', fontWeight: '600' }}>{client.name}</p>
                                            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{client.email}</p>
                                        </div>
                                    </td>
                                    <td style={{ padding: '20px', color: 'var(--text-muted)' }}>{client.last}</td>
                                    <td style={{ padding: '20px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <span style={{ width: '60px', height: '6px', background: '#333', borderRadius: '3px', display: 'inline-block', position: 'relative' }}>
                                                <span style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: '60%', background: 'var(--success-color)', borderRadius: '3px' }}></span>
                                            </span>
                                            ${client.value}
                                        </div>
                                    </td>
                                    <td style={{ padding: '20px', color: 'var(--text-muted)' }}>{client.source}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    };

    // --- SUB-COMPONENT: Inventario ---
    const InventoryPanel = () => {
        return (
            <div>
                <h1 style={{ marginBottom: '30px', fontSize: '2rem', color: 'var(--text-main)' }}>Inventario de Productos</h1>
                <div style={{ background: 'var(--bg-secondary)', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead style={{ background: '#111', color: '#888' }}>
                            <tr>
                                <th style={{ padding: '20px' }}>Producto</th>
                                <th style={{ padding: '20px' }}>Talles Disponibles</th>
                                <th style={{ padding: '20px' }}>Stock Total</th>
                                <th style={{ padding: '20px' }}>Estado Ordenes</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style={{ borderBottom: '1px solid #333' }}>
                                <td style={{ padding: '20px' }}><p style={{ fontWeight: 'bold' }}>Buzo Oversize 'LA' Neón</p><p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Categoría: Buzos</p></td>
                                <td style={{ padding: '20px', color: 'var(--accent-color)' }}>S, M, L, XL</td>
                                <td style={{ padding: '20px' }}><span style={{ padding: '5px 12px', background: 'rgba(0,255,102,0.1)', color: 'var(--success-color)', borderRadius: '20px' }}>12 U.</span></td>
                                <td style={{ padding: '20px', color: 'var(--text-muted)' }}>3 Pendientes de envío</td>
                            </tr>
                            <tr style={{ borderBottom: '1px solid #333' }}>
                                <td style={{ padding: '20px' }}><p style={{ fontWeight: 'bold' }}>Remera Vintage 90s Bulls</p><p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Categoría: Basket</p></td>
                                <td style={{ padding: '20px', color: 'var(--accent-color)' }}>L, XL</td>
                                <td style={{ padding: '20px' }}><span style={{ padding: '5px 12px', background: 'rgba(255,42,42,0.1)', color: 'var(--danger-color)', borderRadius: '20px' }}>4 U. (Crítico)</span></td>
                                <td style={{ padding: '20px', color: 'var(--text-muted)' }}>Ninguna pendiente</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    };

    // --- SUB-COMPONENT: Home Original ---
    const HomePanel = () => {
        // [Mantengo los mocks y componentes originales del Home del Dashboard]
        const barData1 = [{ name: 'Ene', users: 15 }, { name: 'Feb', users: 5 }, { name: 'Mar', users: 85 }, { name: 'Abr', users: 30 }];
        const revenueData = [{ name: 'Ene', ingresos: 8, gastos: 1 }, { name: 'Feb', ingresos: 12, gastos: 2 }, { name: 'Mar', ingresos: 28, gastos: 2 }];
        const pieData = [{ name: 'Zapatillas', value: 400 }, { name: 'Oversize', value: 300 }, { name: 'Accesorios', value: 300 }];
        const COLORS = ['#00F0FF', '#4da8da', '#111111'];

        return (
            <div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '30px' }}>
                    {[
                        { title: 'Ventas Totales', value: '$24.500' }, { title: 'Nuevos Usuarios', value: '3,892' },
                        { title: 'Pedidos', value: '420' }, { title: 'Stock Crítico', value: '12' }
                    ].map((card, idx) => (
                        <div key={idx} style={{ background: 'var(--bg-secondary)', borderRadius: '15px', padding: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
                            <h5 style={{ color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.8rem', marginBottom: '5px' }}>{card.title}</h5>
                            <span style={{ color: 'var(--text-main)', fontSize: '1.5rem', fontWeight: 'bold' }}>{card.value}</span>
                        </div>
                    ))}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '30px' }}>
                    <div style={{ background: 'var(--bg-secondary)', padding: '20px', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <h4 style={{ color: 'var(--text-main)', marginBottom: '20px', fontSize: '1.1rem' }}>Nuevos Clientes 2024</h4>
                        <ResponsiveContainer width="100%" height={200}>
                            <BarChart data={barData1}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#888' }} />
                                <Bar dataKey="users" fill="var(--accent-color)" barSize={15} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    <div style={{ background: 'var(--bg-secondary)', padding: '20px', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <h4 style={{ color: 'var(--text-main)', marginBottom: '20px', fontSize: '1.1rem' }}>Ingresos por Categoría</h4>
                        <ResponsiveContainer width="100%" height={200}>
                            <PieChart>
                                <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value">
                                    {pieData.map((e, idx) => <Cell key={idx} fill={COLORS[idx % COLORS.length]} />)}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div style={{ background: 'var(--bg-secondary)', padding: '20px', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <h4 style={{ color: 'var(--text-main)', marginBottom: '20px' }}>Ingresos vs Gastos</h4>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={revenueData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" />
                            <XAxis dataKey="name" tickLine={false} tick={{ fill: '#888' }} />
                            <Bar dataKey="ingresos" fill="var(--accent-color)" barSize={20} />
                            <Bar dataKey="gastos" fill="#111111" barSize={20} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        );
    };

    // --- MAIN RENDER ---
    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-color)' }}>
            {/* Sidebar Modular */}
            <div style={{ width: '250px', background: 'var(--bg-secondary)', padding: '30px 20px', borderRight: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column' }}>
                <h2 style={{ color: 'var(--text-main)', fontWeight: '900', marginBottom: '40px', letterSpacing: '-1px' }}>
                    <span style={{ color: 'var(--accent-color)' }}>{'{db}'}</span> MALIBU.
                </h2>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {['home', 'clientes', 'inventario', 'estadisticas'].map(tab => (
                        <li 
                            key={tab} 
                            onClick={() => setActiveTab(tab)}
                            style={{ 
                                cursor: 'pointer', padding: '12px 15px', borderRadius: '8px', 
                                display: 'flex', alignItems: 'center', gap: '10px', textTransform: 'capitalize',
                                background: activeTab === tab ? 'rgba(0,240,255,0.1)' : 'transparent',
                                color: activeTab === tab ? 'var(--accent-color)' : 'var(--text-muted)',
                                fontWeight: activeTab === tab ? 'bold' : 'normal',
                                transition: 'all 0.2s'
                            }}
                        >
                            {tab === 'home' && '🏠'}
                            {tab === 'clientes' && '👥'}
                            {tab === 'inventario' && '📦'}
                            {tab === 'estadisticas' && '📊'}
                            {tab}
                        </li>
                    ))}
                </ul>
                <div style={{ marginTop: 'auto' }}>
                    <button onClick={handleLogout} style={{ width: '100%', background: 'transparent', border: '1px solid #333', padding: '10px', color: 'var(--text-muted)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', cursor: 'pointer' }}>
                        <LogOut size={18} /> Salir del Panel
                    </button>
                </div>
            </div>

            {/* Dashboard Container Dinámico */}
            <div style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
                {activeTab === 'home' && <HomePanel />}
                {activeTab === 'clientes' && <ClientsPanel />}
                {activeTab === 'inventario' && <InventoryPanel />}
                {activeTab === 'estadisticas' && <StatisticsPanel />}
            </div>
        </div>
    );
};

export default AdminDashboard;
