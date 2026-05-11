import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { Music, LogOut, Upload, User as UserIcon } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 glass-panel rounded-none border-t-0 border-l-0 border-r-0 border-b border-white/10 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-white hover:text-primary transition-colors">
          <Music className="w-8 h-8 text-primary" />
          <span>Lizzn</span>
        </Link>
        <div className="flex items-center gap-6">
          {user ? (
            <>
              <Link to="/dashboard" className="text-text-secondary hover:text-white transition-colors">Discover</Link>
              {user.role === 'artist' && (
                <Link to="/artist/upload" className="flex items-center gap-2 text-primary hover:text-primary-hover transition-colors">
                  <Upload className="w-4 h-4" /> Studio
                </Link>
              )}
              <div className="flex items-center gap-4 ml-4 pl-4 border-l border-white/10">
                <div className="flex items-center gap-2 text-sm text-text-secondary">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <UserIcon className="w-4 h-4 text-primary" />
                  </div>
                  {user.username}
                </div>
                <button onClick={handleLogout} className="text-text-secondary hover:text-red-400 transition-colors">
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="text-text-secondary hover:text-white transition-colors">Login</Link>
              <Link to="/register" className="btn-primary py-2 px-4 text-sm">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
