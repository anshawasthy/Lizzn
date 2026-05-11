import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { ThemeContext } from '../contexts/ThemeContext';
import { LogOut, Upload, User as UserIcon, Sun, Moon } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border px-6 py-3.5">
      <div className="max-w-7xl mx-auto flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <img src="/logo.png" alt="Lizzn" className="w-9 h-9 object-contain group-hover:scale-105 transition-transform" />
          <span className="text-xl font-bold text-text-primary tracking-tight">Lizzn<span className="text-primary">.</span></span>
        </Link>

        {/* Right Side */}
        <div className="flex items-center gap-2">

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="w-9 h-9 rounded-lg flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-surface-raised transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
          </button>

          {user ? (
            <>
              <Link
                to="/dashboard"
                className="px-3 py-2 text-sm text-text-secondary hover:text-text-primary rounded-lg hover:bg-surface-raised transition-colors"
              >
                Discover
              </Link>

              {user.role === 'artist' && (
                <Link
                  to="/artist/upload"
                  className="flex items-center gap-1.5 px-3 py-2 text-sm text-primary hover:bg-primary/10 rounded-lg transition-colors"
                >
                  <Upload className="w-3.5 h-3.5" />
                  Studio
                </Link>
              )}

              <div className="w-px h-6 bg-border ml-1 mr-1" />

              <div className="flex items-center gap-2.5">
                <div className="flex items-center gap-2 px-2 py-1.5">
                  <div className="w-7 h-7 rounded-full bg-primary/15 flex items-center justify-center">
                    <UserIcon className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-text-secondary">{user.username}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-text-tertiary hover:text-danger hover:bg-danger/10 transition-colors"
                  aria-label="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 text-sm text-text-secondary hover:text-text-primary rounded-lg hover:bg-surface-raised transition-colors"
              >
                Log in
              </Link>
              <Link
                to="/register"
                className="btn-primary text-sm !py-2 !px-5"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
