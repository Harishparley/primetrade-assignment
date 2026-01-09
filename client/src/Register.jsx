import { useState } from 'react';
import API from './api';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await API.post('/auth/register', { username, email, password });
            navigate('/');
        } catch (error) {
            alert('Error: ' + (error.response?.data?.message || 'Server Error'));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-indigo-950 to-black relative overflow-hidden">
             {/* Background Decoration */}
             <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
            
            <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-2xl w-full max-w-md">
                <h2 className="text-3xl font-extrabold text-center text-white mb-2">Create Account</h2>
                <p className="text-center text-gray-400 mb-8 text-sm">Join the future of trading management</p>
                
                <form onSubmit={handleRegister} className="space-y-5">
                    <input className="w-full bg-white/10 border border-white/10 text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition placeholder-gray-500" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    <input className="w-full bg-white/10 border border-white/10 text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition placeholder-gray-500" type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <input className="w-full bg-white/10 border border-white/10 text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition placeholder-gray-500" type="password" placeholder="Create Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    
                    <button disabled={isLoading} className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-xl shadow-lg transition-all hover:shadow-indigo-500/40 hover:-translate-y-0.5">
                        {isLoading ? 'Creating...' : 'Sign Up Free'}
                    </button>
                </form>
                <p className="mt-6 text-center text-gray-500 text-sm">
                    Already a member? <Link to="/" className="text-indigo-400 hover:text-indigo-300 font-semibold">Login here</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;