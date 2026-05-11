import { Link } from 'react-router-dom';
import { Disc3 } from 'lucide-react';

export default function AlbumCard({ album }) {
  return (
    <Link to={`/album/${album._id}`} className="glass-panel p-4 group hover:bg-white/5 transition-all block text-center cursor-pointer">
      <div className="w-full aspect-square bg-gradient-to-br from-purple-900 to-black rounded-lg shadow-lg mb-4 flex items-center justify-center relative overflow-hidden group-hover:shadow-[0_0_20px_rgba(138,43,226,0.3)] transition-all">
        <Disc3 className="w-16 h-16 text-white/20 group-hover:scale-110 transition-transform duration-500" />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white">
            <span className="font-bold tracking-widest text-xs uppercase">View</span>
          </div>
        </div>
      </div>
      <h3 className="text-white font-semibold truncate text-lg">{album.title}</h3>
      <p className="text-text-secondary text-sm mt-1">{album.artist?.username || 'Unknown Artist'}</p>
    </Link>
  );
}
