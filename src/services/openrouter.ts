import axios from 'axios';

const OPENROUTER_API_KEY = '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';
const API_URL = 'https://openrouter.ai/api/v1/chat/completions';

interface GenerateContentParams {
  content: string;
  tone: string;
  category: string;
}

export async function generateContent({ content, tone, category }: GenerateContentParams): Promise<string> {
  try {
    const response = await axios.post(
      API_URL,
      {
        model: 'meta-llama/llama-3.2-90b-vision-instruct',
        messages: [
          {
            role: 'system',
            content: `You are an expert content creator specializing in ${category} content with a ${tone} tone. 
                     Your task is to enhance and restructure the given content while maintaining its core message.
                     Format the output with proper paragraphs and spacing for better readability.
                     Focus on making the content engaging and suitable for audio narration.`
          },
          {
            role: 'user',
            content
          }
        ],
        temperature: 0.7,
        max_tokens: 2048
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'HTTP-Referer': 'https://stackblitz.com',
          'X-Title': 'AUDIOMAX Studio',
          'Content-Type': 'application/json'
        }
      }
    );

    if (!response.data?.choices?.[0]?.message?.content) {
      throw new Error('Invalid response from OpenRouter API');
    }

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('OpenRouter API Error:', error);
    throw new Error('Failed to generate content. Please try again.');
  }
}
