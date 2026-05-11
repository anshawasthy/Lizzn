import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';


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
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="matte-card p-8 sm:p-10 w-full max-w-md animate-fade-in-up">

          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img src="/logo.png" alt="Lizzn" className="w-16 h-16 object-contain" />
          </div>

          <h2 className="text-2xl font-bold text-center text-text-primary mb-1.5">Welcome Back</h2>
          <p className="text-center text-text-secondary text-sm mb-8">Sign in to sync your vibe.</p>

          {error && (
            <div className="bg-danger/10 border border-danger/25 text-danger p-3 rounded-lg mb-6 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-text-secondary text-xs font-medium mb-1.5 uppercase tracking-wider">Username</label>
              <input
                type="text"
                placeholder="Enter username (or leave blank)"
                className="w-full matte-input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-3 my-0.5">
              <div className="flex-1 h-px bg-border" />
              <span className="text-text-tertiary text-[10px] uppercase font-bold tracking-widest">or</span>
              <div className="flex-1 h-px bg-border" />
            </div>

            <div>
              <label className="block text-text-secondary text-xs font-medium mb-1.5 uppercase tracking-wider">Email</label>
              <input
                type="email"
                placeholder="Enter email (or leave blank)"
                className="w-full matte-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-text-secondary text-xs font-medium mb-1.5 uppercase tracking-wider">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                required
                className="w-full matte-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="btn-primary w-full mt-4">
              Sign In
            </button>
          </form>

          <p className="text-center text-text-secondary mt-6 text-sm">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary hover:text-primary-hover transition-colors font-medium">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
