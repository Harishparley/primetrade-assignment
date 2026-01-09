import { useState } from 'react';
import API from './api';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await API.post('/auth/register', { username, email, password });
            alert('Registration Successful! Please Login.');
            navigate('/');
        } catch (error) {
            alert('Error: ' + (error.response?.data?.message || 'Server Error'));
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
                <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">Create Account</h2>
                <form onSubmit={handleRegister} className="space-y-4">
                    <input className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    <input className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <input className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    
                    <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg shadow-lg transition duration-200">
                        Register
                    </button>
                </form>
                <p className="mt-6 text-center text-gray-600 text-sm">
                    Already a member? <Link to="/" className="text-green-600 font-semibold hover:underline">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;