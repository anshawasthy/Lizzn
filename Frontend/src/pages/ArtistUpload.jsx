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
      
      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-8">
        <h1 className="text-4xl font-bold text-white mb-8">Artist Studio</h1>

        <div className="flex gap-4 mb-8 border-b border-white/10 pb-2">
          <button 
            className={`pb-2 px-2 text-lg font-medium transition-colors ${activeTab === 'track' ? 'text-primary border-b-2 border-primary' : 'text-text-secondary hover:text-white'}`}
            onClick={() => setActiveTab('track')}
          >
            Upload Track
          </button>
          <button 
            className={`pb-2 px-2 text-lg font-medium transition-colors ${activeTab === 'album' ? 'text-primary border-b-2 border-primary' : 'text-text-secondary hover:text-white'}`}
            onClick={() => setActiveTab('album')}
          >
            Create Album
          </button>
        </div>

        <div className="glass-panel p-8">
          {activeTab === 'track' ? (
            <form onSubmit={handleTrackUpload} className="flex flex-col gap-6">
              <h2 className="text-2xl font-semibold text-white flex items-center gap-2"><Upload className="w-6 h-6 text-primary" /> New Release</h2>
              
              {trackMsg && <div className={`p-4 rounded-lg text-sm ${trackMsg.includes('success') ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>{trackMsg}</div>}
              
              <div>
                <label className="block text-text-secondary text-sm mb-2">Track Title</label>
                <input 
                  type="text" 
                  required
                  className="w-full glass-input"
                  value={trackTitle}
                  onChange={(e) => setTrackTitle(e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-text-secondary text-sm mb-2">Audio File</label>
                <input 
                  type="file" 
                  accept="audio/*"
                  required
                  className="w-full glass-input file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/20 file:text-primary hover:file:bg-primary/30"
                  onChange={(e) => setAudioFile(e.target.files[0])}
                />
              </div>
              
              <button type="submit" disabled={isUploadingTrack} className="btn-primary flex items-center justify-center gap-2 mt-4 disabled:opacity-50">
                {isUploadingTrack ? <Loader2 className="w-5 h-5 animate-spin" /> : <Upload className="w-5 h-5" />}
                Upload Track
              </button>
            </form>
          ) : (
            <form onSubmit={handleCreateAlbum} className="flex flex-col gap-6">
              <h2 className="text-2xl font-semibold text-white flex items-center gap-2"><Plus className="w-6 h-6 text-primary" /> New Album</h2>
              
              {albumMsg && <div className={`p-4 rounded-lg text-sm ${albumMsg.includes('success') ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>{albumMsg}</div>}
              
              <div>
                <label className="block text-text-secondary text-sm mb-2">Album Title</label>
                <input 
                  type="text" 
                  required
                  className="w-full glass-input"
                  value={albumTitle}
                  onChange={(e) => setAlbumTitle(e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-text-secondary text-sm mb-2">Select Tracks for Album</label>
                <div className="max-h-64 overflow-y-auto glass-panel p-2 rounded-lg bg-black/20">
                  {myTracks.length === 0 ? (
                     <p className="text-text-secondary text-center p-4">No tracks available to add.</p>
                  ) : (
                     <div className="flex flex-col gap-2">
                       {myTracks.map(track => (
                         <label key={track._id} className="flex items-center gap-4 p-3 hover:bg-white/5 rounded-md cursor-pointer transition-colors">
                           <input 
                             type="checkbox" 
                             checked={selectedTracks.includes(track._id)}
                             onChange={(e) => {
                               if (e.target.checked) setSelectedTracks([...selectedTracks, track._id]);
                               else setSelectedTracks(selectedTracks.filter(id => id !== track._id));
                             }}
                             className="w-5 h-5 rounded border-white/20 text-primary focus:ring-primary/50 bg-black/40"
                           />
                           <Music className="w-5 h-5 text-text-secondary" />
                           <span className="text-white">{track.title}</span>
                         </label>
                       ))}
                     </div>
                  )}
                </div>
              </div>
              
              <button type="submit" disabled={isCreatingAlbum} className="btn-primary flex items-center justify-center gap-2 mt-4 disabled:opacity-50">
                {isCreatingAlbum ? <Loader2 className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}
                Create Album
              </button>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}
