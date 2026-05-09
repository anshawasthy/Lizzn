import { createContext, useState, useRef, useEffect } from 'react';

export const PlayerContext = createContext(null);

export function PlayerProvider({ children }) {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio());

  useEffect(() => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.play().catch(e => console.error("Playback prevented:", e));
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  const playTrack = (track) => {
    if (currentTrack?.uri === track.uri) {
      setIsPlaying(true);
      return;
    }
    setCurrentTrack(track);
    audioRef.current.src = track.uri;
    audioRef.current.load();
    setIsPlaying(true);
  };

  const pauseTrack = () => {
    setIsPlaying(false);
  };

  const togglePlay = () => {
    setIsPlaying(prev => !prev);
  };

  return (
    <PlayerContext.Provider value={{ currentTrack, isPlaying, playTrack, pauseTrack, togglePlay }}>
      {children}
    </PlayerContext.Provider>
  );
}
