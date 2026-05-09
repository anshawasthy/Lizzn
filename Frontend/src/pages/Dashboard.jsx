import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import TrackCard from '../components/TrackCard';
import AlbumCard from '../components/AlbumCard';
import api from '../lib/api';
import { Loader2 } from 'lucide-react';

export default function Dashboard() {
  const [musics, setMusics] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [musicRes, albumRes] = await Promise.all([
          api.get('/music/listen'),
          api.get('/music/albums')
        ]);
        setMusics(musicRes.data.musics || []);
        setAlbums(albumRes.data.albums || []);
      } catch (err) {
        console.error('Failed to fetch dashboard data', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col pb-24">
      <Navbar />
      
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8">
        <h1 className="text-4xl font-bold text-white mb-8">Discover</h1>

        {loading ? (
          <div className="flex items-center justify-center h-64">
             <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
        ) : (
          <>
            <section className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-white">Trending Tracks</h2>
              </div>
              {musics.length === 0 ? (
                <div className="glass-panel p-8 text-center text-text-secondary">No tracks available yet.</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {musics.map(track => (
                    <TrackCard key={track._id} track={track} />
                  ))}
                </div>
              )}
            </section>

            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-white">Featured Albums</h2>
              </div>
              {albums.length === 0 ? (
                <div className="glass-panel p-8 text-center text-text-secondary">No albums available yet.</div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                  {albums.map(album => (
                    <AlbumCard key={album._id} album={album} />
                  ))}
                </div>
              )}
            </section>
          </>
        )}
      </main>
    </div>
  );
}
