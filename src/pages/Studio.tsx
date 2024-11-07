import { useState } from 'react';
import { Upload, Loader2, Edit2, Save, RotateCcw, MoreVertical } from 'lucide-react';
import { ContentInput } from '../components/studio/ContentInput';
import { ContentSettings } from '../components/studio/ContentSettings';
import { TranscriptEditor } from '../components/studio/TranscriptEditor';
import { AudioPlayer } from '../components/studio/AudioPlayer';
import { PublishConfirmation } from '../components/studio/PublishConfirmation';

interface ContentSettings {
  category: string;
  tone: string;
  voiceType: 'library' | 'clone';
  voice: string;
}

export function Studio() {
  // Content state
  const [content, setContent] = useState('');
  const [settings, setSettings] = useState<ContentSettings>({
    category: 'podcast',
    tone: 'professional',
    voiceType: 'library',
    voice: 'en-US-Standard-A'
  });

  // Generation state
  const [isGenerating, setIsGenerating] = useState(false);
  const [transcript, setTranscript] = useState<string | null>(null);
  const [isGeneratingAudio, setIsGeneratingAudio] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [showPublishConfirm, setShowPublishConfirm] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      // TODO: Call Mistral API to generate content
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulated delay
      setTranscript('Generated transcript will appear here...');
      generateAudio();
    } catch (error) {
      console.error('Generation error:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const generateAudio = async () => {
    setIsGeneratingAudio(true);
    try {
      const response = await fetch('http://localhost:3000/api/audio/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: transcript, languageCode: 'en-US', voiceName: settings.voice }),
      });
      const data = await response.json();
      if (response.ok) {
        setAudioUrl(`http://localhost:3000${data.audioUrl}`);
      } else {
        console.error('Audio generation error:', data.error);
      }
    } catch (error) {
      console.error('Audio generation error:', error);
    } finally {
      setIsGeneratingAudio(false);
    }
  };

  const handlePublish = () => {
    setShowPublishConfirm(true);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header with Workflow */}
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

      {/* Main Content Area */}
      <div className="grid grid-cols-2 gap-6">
        {/* Left Side - Input and Settings */}
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

        {/* Right Side - Transcript */}
        <div>
          {isGenerating ? (
            <div className="h-full flex items-center justify-center bg-white/5 rounded-lg border border-white/10">
              <div className="flex flex-col items-center gap-2 text-white/60">
                <Loader2 className="w-8 h-8 animate-spin" />
                <span>Generating content with Mistral 7B...</span>
              </div>
            </div>
          ) : transcript ? (
            <TranscriptEditor
              transcript={transcript}
              onChange={setTranscript}
              onRegenerate={generateAudio}
            />
          ) : (
            <div className="h-full flex items-center justify-center bg-white/5 rounded-lg border border-white/10">
              <p className="text-white/60">
                Generated content will appear here
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Audio Section */}
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
                <button
                  onClick={handlePublish}
                  className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg transition-colors"
                >
                  Publish
                </button>
              </div>
              <AudioPlayer url={audioUrl} />
            </div>
          ) : null}
        </div>
      )}

      {/* Publish Confirmation Dialog */}
      {showPublishConfirm && (
        <PublishConfirmation
          onConfirm={() => {
            // TODO: Handle publish
            setShowPublishConfirm(false);
          }}
          onCancel={() => setShowPublishConfirm(false)}
        />
      )}
    </div>
  );
}