import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from 'react';
import { AuthProvider, AuthContext } from './contexts/AuthContext';
import { PlayerProvider } from './contexts/PlayerContext';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ArtistUpload from "./pages/ArtistUpload";
import AlbumDetail from "./pages/AlbumDetail";
import GlobalPlayer from "./components/GlobalPlayer";
import { Loader2 } from 'lucide-react';

function ProtectedRoute({ children }) {
  const { user, loading } = useContext(AuthContext);
  if (loading) return <div className="h-screen flex items-center justify-center bg-background"><Loader2 className="w-8 h-8 text-primary animate-spin" /></div>;
  if (!user) return <Navigate to="/login" />;
  return children;
}

function ArtistRoute({ children }) {
  const { user, loading } = useContext(AuthContext);
  if (loading) return <div className="h-screen flex items-center justify-center bg-background"><Loader2 className="w-8 h-8 text-primary animate-spin" /></div>;
  if (!user || user.role !== 'artist') return <Navigate to="/dashboard" />;
  return children;
}

function AppContent() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/artist/upload" element={<ArtistRoute><ArtistUpload /></ArtistRoute>} />
        <Route path="/album/:id" element={<ProtectedRoute><AlbumDetail /></ProtectedRoute>} />
      </Routes>
      <GlobalPlayer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PlayerProvider>
          <AppContent />
        </PlayerProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;