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
            <Loader2 className="w-6 h-6 text-primary animate-spin" />
          </div>
        ) : !album ? (
          <div className="text-center text-text-secondary mt-16 text-sm">Album not found.</div>
        ) : (
          <div className="flex flex-col md:flex-row gap-10 items-start mt-4 animate-fade-in-up">

            {/* Album Art */}
            <div className="w-56 h-56 md:w-64 md:h-64 flex-shrink-0 bg-surface-raised rounded-2xl border border-border flex items-center justify-center group">
              <Disc3 className="w-20 h-20 text-text-tertiary group-hover:text-primary group-hover:rotate-180 transition-all duration-1000" />
            </div>

            {/* Album Info */}
            <div className="flex-1 min-w-0">
              <span className="text-primary font-semibold tracking-widest text-xs uppercase mb-2 block">Album</span>
              <h1 className="text-4xl md:text-5xl font-extrabold text-text-primary mb-3 tracking-tight leading-tight">{album.title}</h1>
              <p className="text-lg text-text-secondary mb-6">{album.artist?.username || 'Unknown Artist'}</p>

              <div className="flex items-center gap-3 mb-8 pb-5 border-b border-border">
                <span className="text-text-tertiary text-sm">{album.musics?.length || 0} tracks</span>
              </div>

              {/* Track List */}
              <div className="flex flex-col gap-2">
                {album.musics && album.musics.length > 0 ? (
                  album.musics.map((track, index) => (
                    <div key={track._id} className="flex items-center gap-3">
                      <span className="w-6 text-right text-text-tertiary font-mono text-xs tabular-nums">{index + 1}</span>
                      <div className="flex-1">
                        <TrackCard track={track} />
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-text-secondary text-sm">No tracks available in this album.</p>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
