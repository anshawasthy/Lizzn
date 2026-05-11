import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';
import { UserPlus } from 'lucide-react';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(username, email, password, role);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1493225457124-a1a2a5f52923?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10 pointer-events-none"></div>
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="glass-panel p-8 w-full max-w-md relative z-10 mt-8">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
              <UserPlus className="w-8 h-8 text-primary" />
            </div>
          </div>
          
          <h2 className="text-3xl font-bold text-center text-white mb-2">Join Lizzn</h2>
          <p className="text-center text-text-secondary mb-8">Create an account to start your journey.</p>
          
          {error && <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded-lg mb-6 text-sm">{error}</div>}
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <input 
                type="text" 
                placeholder="Username" 
                required
                className="w-full glass-input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <input 
                type="email" 
                placeholder="Email Address" 
                required
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
            
            <div className="flex gap-4 mt-2">
              <label className={`flex-1 flex items-center justify-center py-3 px-4 rounded-lg cursor-pointer border transition-all ${role === 'user' ? 'bg-primary/20 border-primary text-white' : 'bg-white/5 border-white/10 text-text-secondary hover:bg-white/10'}`}>
                <input type="radio" name="role" value="user" checked={role === 'user'} onChange={(e) => setRole(e.target.value)} className="hidden" />
                Listener
              </label>
              <label className={`flex-1 flex items-center justify-center py-3 px-4 rounded-lg cursor-pointer border transition-all ${role === 'artist' ? 'bg-primary/20 border-primary text-white' : 'bg-white/5 border-white/10 text-text-secondary hover:bg-white/10'}`}>
                <input type="radio" name="role" value="artist" checked={role === 'artist'} onChange={(e) => setRole(e.target.value)} className="hidden" />
                Artist
              </label>
            </div>
            
            <button type="submit" className="btn-primary w-full mt-6">
              Create Account
            </button>
          </form>
          
          <p className="text-center text-text-secondary mt-6 text-sm">
            Already have an account? <Link to="/login" className="text-primary hover:text-white transition-colors">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
