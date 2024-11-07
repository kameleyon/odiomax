import { useState, useRef, useEffect } from 'react';
import { Edit2, Save, RotateCcw } from 'lucide-react';

interface TranscriptEditorProps {
  transcript: string;
  onChange: (transcript: string) => void;
  onRegenerate: () => void;
}

export function TranscriptEditor({ transcript, onChange, onRegenerate }: TranscriptEditorProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTranscript, setEditedTranscript] = useState(transcript);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setEditedTranscript(transcript);
  }, [transcript]);

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [editedTranscript, isEditing]);

  const handleSave = () => {
    onChange(editedTranscript);
    setIsEditing(false);
    onRegenerate();
  };

  return (
    <div className="h-full flex flex-col bg-white/5 rounded-lg border border-white/10">
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <h2 className="text-lg font-semibold">Generated Content</h2>
        <div className="flex items-center gap-2">
          {isEditing ? (
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-3 py-1.5 bg-primary hover:bg-primary/80 rounded-lg transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>Save & Generate Audio</span>
            </button>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                title="Edit transcript"
              >
                <Edit2 className="w-5 h-5" />
              </button>
              <button
                onClick={onRegenerate}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                title="Regenerate audio"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
            </>
          )}
        </div>
      </div>

      <div className="flex-1 p-4 overflow-hidden">
        {isEditing ? (
          <textarea
            ref={textareaRef}
            value={editedTranscript}
            onChange={(e) => setEditedTranscript(e.target.value)}
            className="w-full h-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg 
                     focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary
                     resize-none overflow-y-auto"
            style={{
              minHeight: '300px',
              maxHeight: 'calc(100vh - 400px)'
            }}
          />
        ) : (
          <div 
            className="h-full px-4 py-3 overflow-y-auto whitespace-pre-wrap"
            style={{
              maxHeight: 'calc(100vh - 400px)'
            }}
          >
            {transcript}
          </div>
        )}
      </div>
    </div>
  );
}
