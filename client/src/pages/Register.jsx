import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';


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
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="matte-card p-8 sm:p-10 w-full max-w-md animate-fade-in-up">

          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img src="/logo.png" alt="Lizzn" className="w-16 h-16 object-contain" />
          </div>

          <h2 className="text-2xl font-bold text-center text-text-primary mb-1.5">Join Lizzn<span className="text-primary">.</span></h2>
          <p className="text-center text-text-secondary text-sm mb-8">Create an account to start your journey.</p>

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
                placeholder="Choose a username"
                required
                className="w-full matte-input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-text-secondary text-xs font-medium mb-1.5 uppercase tracking-wider">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                required
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

            {/* Role Selector */}
            <div className="mt-1">
              <label className="block text-text-secondary text-xs font-medium mb-2 uppercase tracking-wider">I am a</label>
              <div className="flex gap-3">
                <label
                  className={`flex-1 flex items-center justify-center py-3 px-4 rounded-xl cursor-pointer border text-sm font-medium transition-all ${
                    role === 'user'
                      ? 'bg-primary/10 border-primary/30 text-primary'
                      : 'bg-surface-raised border-border text-text-secondary hover:border-border hover:text-text-primary'
                  }`}
                >
                  <input type="radio" name="role" value="user" checked={role === 'user'} onChange={(e) => setRole(e.target.value)} className="hidden" />
                  Listener
                </label>
                <label
                  className={`flex-1 flex items-center justify-center py-3 px-4 rounded-xl cursor-pointer border text-sm font-medium transition-all ${
                    role === 'artist'
                      ? 'bg-primary/10 border-primary/30 text-primary'
                      : 'bg-surface-raised border-border text-text-secondary hover:border-border hover:text-text-primary'
                  }`}
                >
                  <input type="radio" name="role" value="artist" checked={role === 'artist'} onChange={(e) => setRole(e.target.value)} className="hidden" />
                  Artist
                </label>
              </div>
            </div>

            <button type="submit" className="btn-primary w-full mt-5">
              Create Account
            </button>
          </form>

          <p className="text-center text-text-secondary mt-6 text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-primary hover:text-primary-hover transition-colors font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
