import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Headphones, ArrowRight } from 'lucide-react';
import { ThemeContext } from '../contexts/ThemeContext';
import Navbar from '../components/Navbar';

const COVERS = [
  '/covers/cover1.png',
  '/covers/cover2.png',
  '/covers/cover3.png',
  '/covers/cover4.png',
  '/covers/cover5.png',
  '/covers/cover6.png',
  '/covers/cover7.png',
  '/covers/cover8.png',
  '/covers/cover9.png',
];

export default function Home() {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';

  // Repeat covers to fill the grid
  const tiles = [...COVERS, ...COVERS, ...COVERS, ...COVERS];

  // Theme-aware overlay colours
  const bgBase = isDark ? '#0a0a0c' : '#f5f3f0';
  const overlayOpacity = isDark ? '0.82' : '0.85';

  return (
    <div
      className="min-h-screen flex flex-col relative overflow-hidden"
      style={{ backgroundColor: bgBase }}
    >
      <Navbar />

      {/* ── Album Cover Tile Mosaic Background ── */}
      <div className="absolute inset-0 z-0">
        <div
          className={`grid w-full h-full ${isDark ? 'gap-1.5 p-1.5' : 'gap-0 p-0'}`}
          style={{
            gridTemplateColumns: 'repeat(6, 1fr)',
            gridAutoRows: '1fr',
          }}
        >
          {tiles.map((src, i) => (
            <div key={i} className={`relative overflow-hidden ${isDark ? 'rounded-md' : 'rounded-none'}`}>
              <img
                src={src}
                alt=""
                loading="lazy"
                className="w-full h-full object-cover"
                style={{
                  filter: isDark 
                    ? 'brightness(0.7) saturate(0.6)' 
                    : 'opacity(0.7) grayscale(0.7) brightness(1.1) contrast(1.1)',
                }}
              />
            </div>
          ))}
        </div>

        {/* Matte overlay — adapts to theme */}
        <div
          className="absolute inset-0"
          style={{ backgroundColor: bgBase, opacity: overlayOpacity }}
        />
        {/* Radial vignette */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at center, transparent 0%, ${bgBase} 75%)`,
          }}
        />
      </div>

      {/* ── Hero Content ── */}
      <main className="flex-1 flex flex-col items-center justify-center relative z-10 px-6 py-24 text-center">
        <div className="max-w-3xl mx-auto flex flex-col items-center animate-fade-in-up">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary mb-10 border border-primary/15">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-subtle-pulse" />
            <span className="text-xs font-semibold tracking-widest uppercase">Now Streaming</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-text-primary mb-6 leading-[1.1] tracking-tight">
            Feel the Music.
            <br />
            <span className="text-primary">Live the Vibe.</span>
          </h1>

          <p className="text-lg text-text-secondary mb-12 max-w-xl leading-relaxed">
            Discover exclusive tracks, connect with emerging artists, and experience a fully immersive auditory journey with Lizzn<span className="text-primary">.</span>
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/register" className="btn-primary flex items-center gap-2.5 text-base px-8 py-3.5">
              <Headphones className="w-5 h-5" />
              Start Listening Free
            </Link>
            <Link to="/login" className="btn-secondary flex items-center gap-2 text-base px-8 py-3.5">
              Explore
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>

      {/* Minimal footer */}
      <div className="relative z-10 border-t border-border py-6 text-center">
        <p className="text-xs text-text-tertiary tracking-wide">
          © {new Date().getFullYear()} Lizzn<span className="text-primary">.</span> — Crafted for music lovers.
        </p>
      </div>
    </div>
  );
}
