import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import TrackCard from '../components/TrackCard';
import api from '../lib/api';
import { Disc3, Loader2 } from 'lucide-react';

export default function AlbumDetail() {
  const { id } = useParams();
  const [album, setAlbum] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        const res = await api.get(`/music/album/${id}`);
        setAlbum(res.data.album);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAlbum();
  }, [id]);

  return (
    <div className="min-h-screen flex flex-col pb-24">
      <Navbar />
      
      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-8">
        {loading ? (
          <div className="flex items-center justify-center h-64">
             <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
        ) : !album ? (
          <div className="text-center text-text-secondary mt-12">Album not found.</div>
        ) : (
          <div className="flex flex-col md:flex-row gap-12 items-start mt-8">
            <div className="w-64 h-64 flex-shrink-0 bg-gradient-to-br from-purple-900 to-black rounded-xl shadow-2xl flex items-center justify-center relative overflow-hidden group">
              <Disc3 className="w-32 h-32 text-white/20 group-hover:scale-110 transition-transform duration-700 group-hover:rotate-[360deg]" />
            </div>
            
            <div className="flex-1">
              <h4 className="text-primary font-bold tracking-widest text-sm uppercase mb-2">Album</h4>
              <h1 className="text-5xl font-extrabold text-white mb-4">{album.title}</h1>
              <p className="text-xl text-text-secondary mb-8">{album.artist?.username || 'Unknown Artist'}</p>
              
              <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-4">
                <span className="text-text-secondary text-sm">{album.musics?.length || 0} tracks</span>
              </div>
              
              <div className="flex flex-col gap-2">
                {album.musics && album.musics.length > 0 ? (
                  album.musics.map((track, index) => (
                    <div key={track._id} className="flex items-center gap-4">
                      <span className="w-6 text-right text-text-secondary/50 font-mono text-sm">{index + 1}</span>
                      <div className="flex-1">
                        <TrackCard track={track} />
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-text-secondary">No tracks available in this album.</p>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
