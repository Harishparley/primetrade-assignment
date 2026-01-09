import { useEffect, useState } from 'react';
import API from './api';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [products, setProducts] = useState([]);
    const [form, setForm] = useState({ name: '', description: '', price: '' });
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => { fetchProducts(); }, []);

    const fetchProducts = async () => {
        try {
            const { data } = await API.get('/products');
            setProducts(data);
        } catch (error) {
            if(error.response?.status === 401) logout();
        }
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            await API.post('/products', form);
            setForm({ name: '', description: '', price: '' });
            fetchProducts();
        } catch (error) { alert('Error creating product'); }
    };

    const handleDelete = async (id) => {
        if(!window.confirm('Delete this item?')) return;
        try { await API.delete(`/products/${id}`); fetchProducts(); } 
        catch (error) { alert('Unauthorized Action'); }
    };

    const logout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    // Helper for random gradient colors based on product name
    const getGradient = (name) => {
        const gradients = [
            'from-pink-500 to-rose-500',
            'from-blue-400 to-indigo-500',
            'from-green-400 to-emerald-500',
            'from-orange-400 to-amber-500',
            'from-purple-500 to-violet-600'
        ];
        return gradients[name.length % gradients.length];
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
            {/* Sticky Glass Navbar */}
            <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">P</div>
                        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">PrimeTrade</h1>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="hidden md:flex flex-col items-end">
                            <span className="text-sm font-semibold text-gray-700">{user?.username}</span>
                            <span className="text-xs text-indigo-500 font-medium uppercase tracking-wider">{user?.role} Account</span>
                        </div>
                        <button onClick={logout} className="bg-gray-100 hover:bg-red-50 text-gray-600 hover:text-red-600 px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 border border-transparent hover:border-red-100">
                            Sign Out
                        </button>
                    </div>
                </div>
            </nav>

            <div className="container mx-auto p-6 max-w-7xl">
                
                {/* Hero / Action Section */}
                <div className="mb-12 mt-6">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Marketplace Overview</h2>
                    <p className="text-gray-500 mb-8">Manage your inventory and track performance.</p>
                    
                    {/* Add Product Card */}
                    <div className="bg-white p-8 rounded-2xl shadow-xl shadow-indigo-100 border border-indigo-50 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full -mr-32 -mt-32 transition-transform group-hover:scale-110"></div>
                        <h3 className="text-lg font-bold text-gray-800 mb-6 relative z-10 flex items-center gap-2">
                            <span className="w-2 h-8 bg-indigo-500 rounded-full"></span>
                            List New Product
                        </h3>
                        <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-12 gap-4 relative z-10">
                            <div className="md:col-span-4">
                                <input className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all" placeholder="Product Name" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} required />
                            </div>
                            <div className="md:col-span-5">
                                <input className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all" placeholder="Short Description" value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} required />
                            </div>
                            <div className="md:col-span-2">
                                <input className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all" type="number" placeholder="Price $" value={form.price} onChange={(e) => setForm({...form, price: e.target.value})} required />
                            </div>
                            <div className="md:col-span-1">
                                <button className="w-full h-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-lg hover:shadow-indigo-500/30 transition-all flex items-center justify-center text-2xl font-bold pb-1">
                                    +
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Grid Layout */}
                {products.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
                        <div className="text-gray-300 text-6xl mb-4">📦</div>
                        <h3 className="text-xl font-medium text-gray-500">No products yet. Start selling!</h3>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {products.map((p) => (
                            <div key={p._id} className="group bg-white rounded-2xl p-4 shadow-sm hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-300 hover:-translate-y-2 border border-gray-100 flex flex-col h-full">
                                {/* Image Placeholder */}
                                <div className={`h-48 rounded-xl bg-gradient-to-br ${getGradient(p.name)} flex items-center justify-center text-white text-5xl font-black shadow-inner mb-5 relative overflow-hidden`}>
                                    <span className="opacity-80 group-hover:scale-110 transition-transform duration-500">{p.name.charAt(0).toUpperCase()}</span>
                                    {/* Price Tag */}
                                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur text-gray-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                                        ${p.price}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="flex-1">
                                    <h3 className="font-bold text-lg text-gray-800 mb-2 truncate group-hover:text-indigo-600 transition-colors">{p.name}</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">{p.description}</p>
                                </div>
                                
                                {/* Footer */}
                                <div className="mt-6 pt-4 border-t border-gray-50 flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-[10px] text-gray-600 font-bold">
                                            {p.user?.username?.[0] || 'U'}
                                        </div>
                                        <span className="text-xs text-gray-400 font-medium">{p.user?.username || 'User'}</span>
                                    </div>
                                    
                                    {(user?.role === 'admin' || user?._id === p.user?._id) && (
                                        <button onClick={() => handleDelete(p._id)} className="text-red-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors" title="Delete Item">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;