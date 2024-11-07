import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { ContentInput } from '../components/studio/ContentInput';
import { ContentSettings } from '../components/studio/ContentSettings';
import { TranscriptEditor } from '../components/studio/TranscriptEditor';
import { AudioPlayer } from '../components/studio/AudioPlayer';
import { PublishConfirmation } from '../components/studio/PublishConfirmation';
import { generateContent } from '../services/openrouter';

interface ContentSettings {
  category: string;
  tone: string;
  voiceType: 'library' | 'clone';
  voice: string;
}

const SERVER_URL = 'http://localhost:3000';

export function Studio() {
  const [content, setContent] = useState('');
  const [settings] = useState<ContentSettings>({
    category: 'podcast',
    tone: 'professional',
    voiceType: 'library',
    voice: 'en-US-Standard-A'
  });
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [transcript, setTranscript] = useState<string | null>(null);
  const [isGeneratingAudio, setIsGeneratingAudio] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [showPublishConfirm, setShowPublishConfirm] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleGenerate = async () => {
    setIsGenerating(true);
    setError(null);
    
    try {
      const generatedContent = await generateContent({
        content,
        tone: settings.tone,
        category: settings.category
      });
      
      setTranscript(generatedContent);
      await generateAudio(generatedContent);
    } catch (error) {
      console.error('Generation error:', error);
      setError('Failed to generate content. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };
  
  const generateAudio = async (text: string) => {
    if (!text) return;

    setIsGeneratingAudio(true);
    setError(null);
    
    try {
      const response = await fetch(`${SERVER_URL}/api/audio/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          text, 
          languageCode: 'en-US', 
          voiceName: settings.voice 
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to generate audio');
      }
      
      const data = await response.json();
      setAudioUrl(`${SERVER_URL}${data.audioUrl}`);
      
    } catch (error) {
      console.error('Audio generation error:', error);
      setError('Failed to generate audio. Please try again.');
    } finally {
      setIsGeneratingAudio(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-4">Studio</h1>
        <div className="p-3 bg-white/5 rounded-lg border border-white/10">
          <div className="flex items-center justify-between text-sm text-white/60">
            <div className="flex items-center gap-2">
              <span>Upload/Write</span>
              <span>➞</span>
              <span>Configure</span>
              <span>➞</span>
              <span>Generate</span>
              <span>➞</span>
              <span>Edit</span>
              <span>➞</span>
              <span>Publish</span>
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
          {error}
        </div>
      )}
      
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <ContentInput 
            content={content}
            onChange={setContent}
          />

          <ContentSettings 
            //settings={settings as any}
            //onChange={setSettings}
          />

          <button
            onClick={handleGenerate}
            disabled={!content || isGenerating}
            className="w-full px-6 py-3 bg-primary hover:bg-primary/80 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerating ? (
              <div className="flex items-center justify-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Generating Content...</span>
              </div>
            ) : (
              <span>Generate</span>
            )}
          </button>
        </div>

        <div className="h-full">
          {isGenerating ? (
            <div className="h-full flex items-center justify-center bg-white/5 rounded-lg border border-white/10">
              <div className="flex flex-col items-center gap-2 text-white/60">
                <Loader2 className="w-8 h-8 animate-spin" />
                <span>Generating Transcript...</span>
              </div>
            </div>
          ) : transcript ? (
            <div className="h-full">
              <TranscriptEditor
                transcript={transcript}
                onChange={setTranscript}
                onRegenerate={() => generateAudio(transcript)}
              />
            </div>
          ) : (
            <div className="h-full flex items-center justify-center bg-white/5 rounded-lg border border-white/10">
              <p className="text-white/60">
                Generated content will appear here
              </p>
            </div>
          )}
        </div>
      </div>

      {transcript && (
        <div className="p-4 bg-white/5 rounded-lg border border-white/10">
          {isGeneratingAudio ? (
            <div className="flex items-center justify-center gap-2 text-white/60 py-4">
              <Loader2 className="w-6 h-6 animate-spin" />
              <span>Generating audio...</span>
            </div>
          ) : audioUrl ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Generated Audio</h2>
              </div>
              <AudioPlayer url={audioUrl} />
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
