import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import api from '../lib/api';
import { Upload, Plus, Music, Loader2 } from 'lucide-react';

export default function ArtistUpload() {
  const [activeTab, setActiveTab] = useState('track');

  // Track Upload State
  const [trackTitle, setTrackTitle] = useState('');
  const [audioFile, setAudioFile] = useState(null);
  const [isUploadingTrack, setIsUploadingTrack] = useState(false);
  const [trackMsg, setTrackMsg] = useState('');

  // Album Creation State
  const [albumTitle, setAlbumTitle] = useState('');
  const [myTracks, setMyTracks] = useState([]);
  const [selectedTracks, setSelectedTracks] = useState([]);
  const [isCreatingAlbum, setIsCreatingAlbum] = useState(false);
  const [albumMsg, setAlbumMsg] = useState('');

  useEffect(() => {
    if (activeTab === 'album') {
      fetchMyTracks();
    }
  }, [activeTab]);

  const fetchMyTracks = async () => {
    try {
      const res = await api.get('/music/listen'); // In a real app we'd filter by artistId, backend returns all currently
      setMyTracks(res.data.musics || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleTrackUpload = async (e) => {
    e.preventDefault();
    if (!audioFile) return setTrackMsg('Please select an audio file');

    setIsUploadingTrack(true);
    setTrackMsg('');
    const formData = new FormData();
    formData.append('title', trackTitle);
    formData.append('audioFile', audioFile);

    try {
      await api.post('/music/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setTrackMsg('Track uploaded successfully!');
      setTrackTitle('');
      setAudioFile(null);
    } catch (err) {
      setTrackMsg(err.response?.data?.message || 'Upload failed');
    } finally {
      setIsUploadingTrack(false);
    }
  };

  const handleCreateAlbum = async (e) => {
    e.preventDefault();
    if (selectedTracks.length === 0) return setAlbumMsg('Please select at least one track');

    setIsCreatingAlbum(true);
    setAlbumMsg('');

    try {
      await api.post('/music/album', {
        title: albumTitle,
        musics: selectedTracks
      });
      setAlbumMsg('Album created successfully!');
      setAlbumTitle('');
      setSelectedTracks([]);
    } catch (err) {
      setAlbumMsg(err.response?.data?.message || 'Failed to create album');
    } finally {
      setIsCreatingAlbum(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col pb-24">
      <Navbar />

      <main className="flex-1 max-w-3xl mx-auto w-full px-6 py-8 animate-fade-in-up">
        <h1 className="text-3xl font-bold text-text-primary mb-8 tracking-tight">Artist Studio</h1>

        {/* Tabs */}
        <div className="flex gap-1 mb-8 p-1 bg-surface-raised rounded-xl border border-border w-fit">
          <button
            className={`px-5 py-2 text-sm font-medium rounded-lg transition-all ${
              activeTab === 'track'
                ? 'bg-surface text-text-primary shadow-sm'
                : 'text-text-secondary hover:text-text-primary'
            }`}
            onClick={() => setActiveTab('track')}
          >
            Upload Track
          </button>
          <button
            className={`px-5 py-2 text-sm font-medium rounded-lg transition-all ${
              activeTab === 'album'
                ? 'bg-surface text-text-primary shadow-sm'
                : 'text-text-secondary hover:text-text-primary'
            }`}
            onClick={() => setActiveTab('album')}
          >
            Create Album
          </button>
        </div>

        {/* Content */}
        <div className="matte-card p-8">
          {activeTab === 'track' ? (
            <form onSubmit={handleTrackUpload} className="flex flex-col gap-6">
              <div className="flex items-center gap-2.5">
                <Upload className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold text-text-primary">New Release</h2>
              </div>

              {trackMsg && (
                <div className={`p-3.5 rounded-xl text-sm font-medium ${
                  trackMsg.includes('success')
                    ? 'bg-success/10 text-success border border-success/20'
                    : 'bg-danger/10 text-danger border border-danger/20'
                }`}>
                  {trackMsg}
                </div>
              )}

              <div>
                <label className="block text-text-secondary text-xs font-medium mb-1.5 uppercase tracking-wider">Track Title</label>
                <input
                  type="text"
                  required
                  className="w-full matte-input"
                  placeholder="My new track..."
                  value={trackTitle}
                  onChange={(e) => setTrackTitle(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-text-secondary text-xs font-medium mb-1.5 uppercase tracking-wider">Audio File</label>
                <div className="matte-input flex items-center gap-3 cursor-pointer">
                  <input
                    type="file"
                    accept="audio/*"
                    required
                    className="w-full text-text-secondary text-sm file:mr-3 file:py-1.5 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 file:cursor-pointer file:transition-colors"
                    onChange={(e) => setAudioFile(e.target.files[0])}
                  />
                </div>
              </div>

              <button type="submit" disabled={isUploadingTrack} className="btn-primary flex items-center justify-center gap-2 mt-2 disabled:opacity-50">
                {isUploadingTrack ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                Upload Track
              </button>
            </form>
          ) : (
            <form onSubmit={handleCreateAlbum} className="flex flex-col gap-6">
              <div className="flex items-center gap-2.5">
                <Plus className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold text-text-primary">New Album</h2>
              </div>

              {albumMsg && (
                <div className={`p-3.5 rounded-xl text-sm font-medium ${
                  albumMsg.includes('success')
                    ? 'bg-success/10 text-success border border-success/20'
                    : 'bg-danger/10 text-danger border border-danger/20'
                }`}>
                  {albumMsg}
                </div>
              )}

              <div>
                <label className="block text-text-secondary text-xs font-medium mb-1.5 uppercase tracking-wider">Album Title</label>
                <input
                  type="text"
                  required
                  className="w-full matte-input"
                  placeholder="Name your album..."
                  value={albumTitle}
                  onChange={(e) => setAlbumTitle(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-text-secondary text-xs font-medium mb-2 uppercase tracking-wider">Select Tracks</label>
                <div className="max-h-64 overflow-y-auto rounded-xl border border-border bg-surface-raised p-1.5">
                  {myTracks.length === 0 ? (
                    <p className="text-text-tertiary text-center p-6 text-sm">No tracks available to add.</p>
                  ) : (
                    <div className="flex flex-col gap-0.5">
                      {myTracks.map(track => (
                        <label
                          key={track._id}
                          className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                            selectedTracks.includes(track._id)
                              ? 'bg-primary/10'
                              : 'hover:bg-surface'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={selectedTracks.includes(track._id)}
                            onChange={(e) => {
                              if (e.target.checked) setSelectedTracks([...selectedTracks, track._id]);
                              else setSelectedTracks(selectedTracks.filter(id => id !== track._id));
                            }}
                            className="w-4 h-4 rounded border-border text-primary accent-[var(--accent)]"
                          />
                          <Music className="w-4 h-4 text-text-tertiary" />
                          <span className="text-text-primary text-sm">{track.title}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <button type="submit" disabled={isCreatingAlbum} className="btn-primary flex items-center justify-center gap-2 mt-2 disabled:opacity-50">
                {isCreatingAlbum ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                Create Album
              </button>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}
