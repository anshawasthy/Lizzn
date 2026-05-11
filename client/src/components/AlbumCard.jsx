import { Link } from 'react-router-dom';
import { Disc3 } from 'lucide-react';

export default function AlbumCard({ album }) {
  return (
    <Link
      to={`/album/${album._id}`}
      className="matte-card p-4 group block text-center cursor-pointer transition-all hover:translate-y-[-2px]"
    >
      <div className="w-full aspect-square bg-surface-raised rounded-xl mb-4 flex items-center justify-center relative overflow-hidden">
        <Disc3 className="w-12 h-12 text-text-tertiary group-hover:text-primary group-hover:rotate-90 transition-all duration-700" />
        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <h3 className="text-text-primary font-semibold truncate text-base">{album.title}</h3>
      <p className="text-text-secondary text-sm mt-1">{album.artist?.username || 'Unknown Artist'}</p>
    </Link>
  );
}
