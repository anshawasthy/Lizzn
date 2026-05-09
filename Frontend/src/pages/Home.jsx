import { Link } from 'react-router-dom';
import { Music, Headphones, Zap } from 'lucide-react';
import Navbar from '../components/Navbar';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex flex-col items-center justify-center relative overflow-hidden px-4 py-20 text-center">
        {/* Abstract Background Elements */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-900/30 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border-white/10 text-primary mb-8 animate-pulse">
            <Zap className="w-4 h-4" />
            <span className="text-sm font-medium tracking-wider uppercase">Next-Gen Audio Experience</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-primary mb-6 leading-tight">
            Feel the Music,<br/> Live the Vibe.
          </h1>
          
          <p className="text-xl text-text-secondary mb-12 max-w-2xl leading-relaxed">
            Discover exclusive tracks, connect with emerging artists, and experience a fully immersive auditory journey with Lizzn.
          </p>
          
          <div className="flex flex-wrap gap-6 justify-center">
            <Link to="/register" className="btn-primary flex items-center gap-2 text-lg px-8 py-4">
              <Headphones className="w-5 h-5" />
              Start Listening Free
            </Link>
            <Link to="/login" className="btn-secondary flex items-center gap-2 text-lg px-8 py-4">
              Explore the Platform
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
