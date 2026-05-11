import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';
import { Music } from 'lucide-react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username || undefined, email || undefined, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10 pointer-events-none"></div>
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="glass-panel p-8 w-full max-w-md relative z-10">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
              <Music className="w-8 h-8 text-primary" />
            </div>
          </div>
          
          <h2 className="text-3xl font-bold text-center text-white mb-2">Welcome Back</h2>
          <p className="text-center text-text-secondary mb-8">Sign in to sync your vibe.</p>
          
          {error && <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded-lg mb-6 text-sm">{error}</div>}
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <input 
                type="text" 
                placeholder="Username (or leave blank if using Email)" 
                className="w-full glass-input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-center text-text-secondary text-xs uppercase font-bold tracking-wider my-1">OR</div>
            <div>
              <input 
                type="email" 
                placeholder="Email (or leave blank if using Username)" 
                className="w-full glass-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input 
                type="password" 
                placeholder="Password" 
                required
                className="w-full glass-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            
            <button type="submit" className="btn-primary w-full mt-4">
              Sign In
            </button>
          </form>
          
          <p className="text-center text-text-secondary mt-6 text-sm">
            Don't have an account? <Link to="/register" className="text-primary hover:text-white transition-colors">Register here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
