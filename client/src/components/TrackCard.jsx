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
    <div
      className={`matte-card p-3.5 group flex items-center justify-between cursor-pointer transition-all hover:translate-y-[-1px] ${isCurrentTrack ? '!border-primary/30' : ''}`}
      onClick={handlePlayClick}
    >
      <div className="flex items-center gap-3 min-w-0">
        <div className={`relative w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center flex-shrink-0 ${isCurrentTrack ? 'bg-primary/15' : 'bg-surface-raised'}`}>
          {isCurrentTrack && isPlaying ? (
            <Pause className="w-4 h-4 text-primary" />
          ) : (
            <Play className="w-4 h-4 text-text-tertiary opacity-0 group-hover:opacity-100 transition-opacity ml-0.5" />
          )}
        </div>
        <div className="min-w-0">
          <h4 className={`text-sm font-medium truncate ${isCurrentTrack ? 'text-primary' : 'text-text-primary'}`}>{track.title}</h4>
          <p className="text-xs text-text-secondary truncate">{track.artist}</p>
        </div>
      </div>
      <div className="text-text-tertiary opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
        <button className="hover:text-text-primary p-1.5 rounded-md hover:bg-surface-raised transition-colors text-xs">•••</button>
      </div>
    </div>
  );
}
