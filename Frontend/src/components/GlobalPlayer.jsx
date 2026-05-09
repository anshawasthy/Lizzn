import { useContext } from 'react';
import { PlayerContext } from '../contexts/PlayerContext';
import { Play, Pause, SkipForward, SkipBack, Volume2 } from 'lucide-react';

export default function GlobalPlayer() {
  const { currentTrack, isPlaying, togglePlay } = useContext(PlayerContext);

  if (!currentTrack) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 glass-panel rounded-none border-b-0 border-l-0 border-r-0 border-t border-white/10 p-4 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4 w-1/3">
          <div className="w-14 h-14 bg-gradient-to-br from-primary to-purple-600 rounded-md shadow-lg flex-shrink-0 animate-pulse"></div>
          <div className="overflow-hidden">
            <h4 className="text-white font-medium truncate">{currentTrack.title}</h4>
            <p className="text-sm text-text-secondary truncate">{currentTrack.artist}</p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center w-1/3 gap-2">
          <div className="flex items-center gap-6">
            <button className="text-text-secondary hover:text-white transition-colors">
              <SkipBack className="w-5 h-5" />
            </button>
            <button 
              onClick={togglePlay}
              className="w-10 h-10 rounded-full bg-primary hover:bg-primary-hover flex items-center justify-center text-white shadow-[0_0_15px_rgba(138,43,226,0.5)] transition-all"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-1" />}
            </button>
            <button className="text-text-secondary hover:text-white transition-colors">
              <SkipForward className="w-5 h-5" />
            </button>
          </div>
          {/* Simple progress bar visual mock */}
          <div className="w-full max-w-md h-1.5 bg-white/10 rounded-full overflow-hidden">
             <div className="h-full bg-primary w-1/3 rounded-full"></div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 w-1/3 text-text-secondary">
          <Volume2 className="w-5 h-5" />
          <div className="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden">
             <div className="h-full bg-white/80 w-2/3 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
