import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Save, RefreshCw } from 'lucide-react';
import { synthesizeSpeech, getAvailableVoices, type Voice } from '../services/tts.service';
import { GoogleAuthStatus } from '../components/tts/GoogleAuthStatus';

export function TTSTest() {
  const [text, setText] = useState('');
  const [voices, setVoices] = useState<Voice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const fetchVoices = async () => {
    try {
      const availableVoices = await getAvailableVoices();
      setVoices(availableVoices);
      if (availableVoices.length > 0) {
        setSelectedVoice(availableVoices[0].name);
      }
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch voices');
    }
  };

  useEffect(() => {
    fetchVoices();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const audioBlob = await synthesizeSpeech(text, selectedVoice);
      const url = URL.createObjectURL(audioBlob);
      setAudioUrl(url);
      setIsPlaying(true);
      
      if (audioRef.current) {
        audioRef.current.src = url;
        audioRef.current.play();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Speech synthesis failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSave = () => {
    if (audioUrl) {
      const a = document.createElement('a');
      a.href = audioUrl;
      a.download = 'tts-audio.mp3';
      a.click();
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Text-to-Speech Test</h1>
      <p className="text-white/60 mb-8">Test Google Cloud Text-to-Speech integration</p>

      <GoogleAuthStatus />

      <div className="bg-white/5 rounded-lg border border-white/10 p-6 mt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="text" className="block text-sm font-medium mb-2">
              Text to Convert
            </label>
            <textarea
              id="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg 
                       focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary
                       min-h-[150px]"
              placeholder="Enter text to convert to speech..."
              required
            />
          </div>

          <div>
            <label htmlFor="voice" className="block text-sm font-medium mb-2">
              Voice
            </label>
            <select
              id="voice"
              value={selectedVoice}
              onChange={(e) => setSelectedVoice(e.target.value)}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg 
                       focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            >
              {voices.map((voice) => (
                <option key={voice.name} value={voice.name}>
                  {voice.languageCode} - {voice.gender}
                </option>
              ))}
            </select>
          </div>

          {error && (
            <div className="text-red-500 text-sm">{error}</div>
          )}

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-2 bg-primary 
                       hover:bg-primary/80 rounded-lg transition-colors disabled:opacity-50"
            >
              {isLoading ? (
                <RefreshCw className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <Play className="w-5 h-5" />
                  <span>Generate Speech</span>
                </>
              )}
            </button>

            {audioUrl && (
              <>
                <button
                  type="button"
                  onClick={handlePlayPause}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5" />
                  ) : (
                    <Play className="w-5 h-5" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleSave}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <Save className="w-5 h-5" />
                </button>
              </>
            )}
          </div>
        </form>

        {audioUrl && (
          <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/10">
            <audio
              ref={audioRef}
              controls
              className="w-full"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            >
              <source src={audioUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        )}
      </div>
    </div>
  );
}