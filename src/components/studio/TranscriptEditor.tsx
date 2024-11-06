import { Edit2, Save, RotateCcw } from 'lucide-react';
import { useState } from 'react';

interface TranscriptEditorProps {
  transcript: string;
  onChange: (transcript: string) => void;
  onRegenerate: () => void;
}

export function TranscriptEditor({ transcript, onChange, onRegenerate }: TranscriptEditorProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTranscript, setEditedTranscript] = useState(transcript);

  const handleSave = () => {
    onChange(editedTranscript);
    setIsEditing(false);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold">Generated Content</h2>
        <div className="flex items-center gap-2">
          {isEditing ? (
            <button
              onClick={handleSave}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              title="Save changes"
            >
              <Save className="w-5 h-5" />
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

      {isEditing ? (
        <textarea
          value={editedTranscript}
          onChange={(e) => setEditedTranscript(e.target.value)}
          className="flex-1 w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg 
                   focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary
                   resize-none"
        />
      ) : (
        <div className="flex-1 p-4 bg-white/5 border border-white/10 rounded-lg overflow-y-auto">
          {transcript}
        </div>
      )}
    </div>
  );
}