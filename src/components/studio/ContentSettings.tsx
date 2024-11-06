import { useState } from 'react';
import { Toggle } from '../ui/Toggle';

export function ContentSettings() {
  const [voiceType, setVoiceType] = useState<'library' | 'clone'>('library');

  const categories = [
    'Podcast', 'TED Talk', 'News', 'Narrative', 'Class',
    'Advertisement', 'Comedy', 'Motivational', 'Meditation',
    'Mantra', 'Kids Content'
  ];

  const tones = [
    'Casual', 'Professional', 'Sarcastic', 'Energetic',
    'Angry', 'Sad', 'Excited', 'Calm', 'Detached'
  ];

  const voices = {
    library: [
      'en-US-Standard-A', 'en-US-Standard-B',
      'en-US-Standard-C', 'en-US-Standard-D',
      'en-GB-Standard-A', 'en-GB-Standard-B',
      'en-GB-Standard-C', 'en-GB-Standard-D'
    ],
    clone: [
      'My Voice 1', 'My Voice 2', 'My Voice 3'
    ]
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Settings</h2>
      
      <div className="space-y-4">
        {/* Category Selection */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Category
          </label>
          <select
            className="w-full px-4 py-2 bg-[#1a1a2e] border border-white/10 rounded-lg 
                     focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary
                     text-white"
          >
            {categories.map((category) => (
              <option key={category} value={category.toLowerCase()}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Tone Selection */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Tone
          </label>
          <select
            className="w-full px-4 py-2 bg-[#1a1a2e] border border-white/10 rounded-lg 
                     focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary
                     text-white"
          >
            {tones.map((tone) => (
              <option key={tone} value={tone.toLowerCase()}>
                {tone}
              </option>
            ))}
          </select>
        </div>

        {/* Voice Selection */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium">Voice</label>
            <Toggle
              value={voiceType}
              onChange={setVoiceType}
              options={[
                { value: 'library', label: 'Library' },
                { value: 'clone', label: 'Clone' }
              ]}
            />
          </div>
          
          <select
            className="w-full px-4 py-2 bg-[#1a1a2e] border border-white/10 rounded-lg 
                     focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary
                     text-white"
          >
            {voices[voiceType].map((voice) => (
              <option key={voice} value={voice}>
                {voice}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}