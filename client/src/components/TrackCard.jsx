import { useContext } from 'react';
import { PlayerContext } from '../contexts/PlayerContext';
import { Play, Pause } from 'lucide-react';

export default function TrackCard({ track }) {
  const { currentTrack, isPlaying, playTrack, togglePlay } = useContext(PlayerContext);
  
  const isCurrentTrack = currentTrack?.uri === track.uri;

  const handlePlayClick = () => {
    if (isCurrentTrack) {
      togglePlay();
    } else {
      playTrack(track);
    }
  };

  return (
    <div className="glass-panel p-4 group hover:bg-white/5 transition-all flex items-center justify-between cursor-pointer" onClick={handlePlayClick}>
      <div className="flex items-center gap-4">
        <div className="relative w-12 h-12 bg-white/10 rounded-md overflow-hidden flex items-center justify-center group-hover:shadow-[0_0_15px_rgba(138,43,226,0.3)] transition-all">
           {isCurrentTrack && isPlaying ? (
             <Pause className="w-6 h-6 text-primary" />
           ) : (
             <Play className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity ml-1" />
           )}
        </div>
        <div>
          <h4 className={`font-medium ${isCurrentTrack ? 'text-primary' : 'text-white'}`}>{track.title}</h4>
          <p className="text-sm text-text-secondary">{track.artist}</p>
        </div>
      </div>
      <div className="text-text-secondary opacity-0 group-hover:opacity-100 transition-opacity">
        <button className="hover:text-white p-2">...</button>
      </div>
    </div>
  );
}
