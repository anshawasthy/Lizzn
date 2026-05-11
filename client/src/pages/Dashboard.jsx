import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import TrackCard from '../components/TrackCard';
import AlbumCard from '../components/AlbumCard';
import api from '../lib/api';
import { Loader2, TrendingUp, Disc3 } from 'lucide-react';

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

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8 animate-fade-in-up">
        <h1 className="text-3xl font-bold text-text-primary mb-10 tracking-tight">Discover</h1>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="w-6 h-6 text-primary animate-spin" />
          </div>
        ) : (
          <>
            {/* Trending Tracks */}
            <section className="mb-14">
              <div className="flex items-center gap-2.5 mb-6">
                <TrendingUp className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-semibold text-text-primary">Trending Tracks</h2>
              </div>
              {musics.length === 0 ? (
                <div className="matte-card p-10 text-center text-text-secondary text-sm">
                  No tracks available yet. Check back soon.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {musics.map(track => (
                    <TrackCard key={track._id} track={track} />
                  ))}
                </div>
              )}
            </section>

            {/* Featured Albums */}
            <section>
              <div className="flex items-center gap-2.5 mb-6">
                <Disc3 className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-semibold text-text-primary">Featured Albums</h2>
              </div>
              {albums.length === 0 ? (
                <div className="matte-card p-10 text-center text-text-secondary text-sm">
                  No albums available yet. Check back soon.
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
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
