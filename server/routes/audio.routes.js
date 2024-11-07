import { Router } from "express";
import fs from "fs";
import util from "util";
import path from "path";
import { fileURLToPath } from 'url';
import { TextToSpeechClient } from '@google-cloud/text-to-speech';
import { config as dotenvConfig } from 'dotenv';
//import { requireAuth } from '../middleware/auth.js';
dotenvConfig();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const audioRoutes = Router();

const client = new TextToSpeechClient({
  credentials: {
    type: 'service_account',
    project_id: process.env.GOOGLE_PROJECT_ID,
    private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    client_id: process.env.GOOGLE_CLIENT_ID,
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_x509_cert_url: `https://www.googleapis.com/robot/v1/metadata/x509/${encodeURIComponent(process.env.GOOGLE_CLIENT_EMAIL)}`
  }
});

audioRoutes.post("/generate", async (req, res) => {
  const {
    text,
    languageCode = "en-US",
    voiceName = "en-US-Standard-A",
    speakingRate = 1.0,
  } = req.body;
  const request = {
    input: { text },
    voice: {
      languageCode,
      name: voiceName,
    },
    audioConfig: {
      audioEncoding: "MP3",
      speakingRate,
    },
  };
  try {
    // Generate the TTS audio
    const [response] = await client.synthesizeSpeech(request);
    const audioFileName = `audio_${Date.now()}.mp3`;
    const audioPath = path.join(__dirname, "..","audios", audioFileName);

    // Save audio to file
    await util.promisify(fs.writeFile)(
      audioPath,
      response.audioContent,
      "binary"
    );
    res.status(200).json({ audioUrl: `/audios/${audioFileName}` });
  } catch (error) {
    console.error("Error generating audio:", error);
    res.status(500).json({ error: "Failed to generate audio" });
  }
});