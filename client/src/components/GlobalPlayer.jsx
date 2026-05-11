import { useContext } from 'react';
import { PlayerContext } from '../contexts/PlayerContext';
import { Play, Pause, SkipForward, SkipBack, Volume2 } from 'lucide-react';

export default function GlobalPlayer() {
  const { currentTrack, isPlaying, togglePlay } = useContext(PlayerContext);

  if (!currentTrack) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-surface border-t border-border p-3 z-50 shadow-[0_-2px_20px_rgba(0,0,0,.15)]">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">

        {/* Track Info */}
        <div className="flex items-center gap-3 w-1/3 min-w-0">
          <div className="w-11 h-11 bg-primary/10 rounded-lg flex-shrink-0 flex items-center justify-center">
            <div className={`w-5 h-5 rounded-full bg-primary/40 ${isPlaying ? 'animate-subtle-pulse' : ''}`} />
          </div>
          <div className="min-w-0">
            <h4 className="text-sm font-semibold text-text-primary truncate">{currentTrack.title}</h4>
            <p className="text-xs text-text-secondary truncate">{currentTrack.artist}</p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col items-center justify-center w-1/3 gap-2">
          <div className="flex items-center gap-5">
            <button className="text-text-tertiary hover:text-text-primary transition-colors" aria-label="Previous track">
              <SkipBack className="w-4 h-4" />
            </button>
            <button
              onClick={togglePlay}
              className="w-10 h-10 rounded-full bg-primary hover:bg-primary-hover flex items-center justify-center text-white transition-all hover:scale-105 active:scale-95"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
            </button>
            <button className="text-text-tertiary hover:text-text-primary transition-colors" aria-label="Next track">
              <SkipForward className="w-4 h-4" />
            </button>
          </div>
          {/* Progress bar */}
          <div className="w-full max-w-sm h-1 bg-border rounded-full overflow-hidden">
            <div className="h-full bg-primary/60 w-1/3 rounded-full transition-all" />
          </div>
        </div>

        {/* Volume */}
        <div className="flex items-center justify-end gap-2 w-1/3 text-text-tertiary">
          <Volume2 className="w-4 h-4" />
          <div className="w-20 h-1 bg-border rounded-full overflow-hidden">
            <div className="h-full bg-text-secondary w-2/3 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
