import { Router } from 'express';
import { TextToSpeechClient } from '@google-cloud/text-to-speech';

export const ttsRoutes = Router();

const client = new TextToSpeechClient({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    project_id: process.env.GOOGLE_PROJECT_ID,
  },
});

ttsRoutes.get('/voices', async (req, res) => {
  try {
    const [response] = await client.listVoices({});
    
    // Filter and transform voices to ensure serializable data
    const voices = response.voices
      .filter(voice => voice.languageCodes?.includes('en-US') || voice.languageCodes?.includes('en-GB'))
      .map(voice => ({
        name: String(voice.name || ''),
        languageCode: String(voice.languageCodes?.[0] || ''),
        gender: voice.ssmlGender ? String(voice.ssmlGender) : undefined,
        sampleRate: voice.naturalSampleRateHertz ? Number(voice.naturalSampleRateHertz) : undefined
      }));
    
    res.json(voices);
  } catch (error) {
    console.error('List Voices Error:', error);
    res.status(500).json({
      error: {
        message: String(error.message)
      }
    });
  }
});

ttsRoutes.post('/synthesize', async (req, res) => {
  try {
    const { text, voice } = req.body;
    
    if (!text || !voice) {
      return res.status(400).json({
        error: {
          message: 'Missing required parameters'
        }
      });
    }

    const request = {
      input: { text: String(text) },
      voice: {
        languageCode: String(voice.split('-').slice(0, 2).join('-')),
        name: String(voice),
      },
      audioConfig: { audioEncoding: 'MP3' },
    };

    const [response] = await client.synthesizeSpeech(request);
    
    res.set('Content-Type', 'audio/mpeg');
    res.send(Buffer.from(response.audioContent));
  } catch (error) {
    console.error('TTS Route Error:', error);
    res.status(500).json({
      error: {
        message: String(error.message)
      }
    });
  }
});