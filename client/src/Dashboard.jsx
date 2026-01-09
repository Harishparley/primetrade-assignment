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
        if(!window.confirm('Are you sure?')) return;
        try { await API.delete(`/products/${id}`); fetchProducts(); } 
        catch (error) { alert('Unauthorized'); }
    };

    const logout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navbar */}
            <nav className="bg-white shadow-md p-4 flex justify-between items-center sticky top-0 z-50">
                <h1 className="text-2xl font-bold text-blue-600">PrimeTrade</h1>
                <div className="flex items-center gap-4">
                    <span className="text-gray-600">Hello, <b>{user?.username}</b></span>
                    <button onClick={logout} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition">Logout</button>
                </div>
            </nav>

            <div className="container mx-auto p-6 max-w-6xl">
                
                {/* Add Product Section */}
                <div className="bg-white p-6 rounded-xl shadow-md mb-10 border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-700 mb-4 border-b pb-2">Add New Item</h3>
                    <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <input className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none" placeholder="Product Name" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} required />
                        <input className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none md:col-span-2" placeholder="Description" value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} required />
                        <div className="flex gap-2">
                            <input className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-400 outline-none" type="number" placeholder="Price ($)" value={form.price} onChange={(e) => setForm({...form, price: e.target.value})} required />
                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold transition shadow-md">+</button>
                        </div>
                    </form>
                </div>

                {/* Product Grid */}
                <h3 className="text-xl font-bold text-gray-800 mb-6">Marketplace Listings</h3>
                
                {products.length === 0 ? (
                    <p className="text-center text-gray-400 mt-10 text-lg">No products found. Add one above!</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {products.map((p) => (
                            <div key={p._id} className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 overflow-hidden relative group">
                                <div className="h-40 bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center text-white text-4xl font-bold uppercase tracking-widest">
                                    {p.name.charAt(0)}
                                </div>
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-bold text-xl text-gray-800 truncate">{p.name}</h3>
                                        <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded-full">${p.price}</span>
                                    </div>
                                    <p className="text-gray-600 text-sm mb-4 h-12 overflow-hidden">{p.description}</p>
                                    
                                    <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                                        <span className="text-xs text-gray-400">By: {p.user?.username || 'Unknown'}</span>
                                        
                                        {(user?.role === 'admin' || user?._id === p.user?._id) && (
                                            <button onClick={() => handleDelete(p._id)} className="text-red-500 hover:text-red-700 text-sm font-semibold transition">
                                                Delete
                                            </button>
                                        )}
                                    </div>
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