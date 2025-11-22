import { config } from 'dotenv';
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function getUnsplashImage() {
  try {
    const query = 'blockchain technology AI security network';
    const response = await axios.get('https://api.unsplash.com/photos/random', {
      params: {
        query,
        orientation: 'landscape',
        w: 1920,
        h: 1080,
      },
      headers: {
        Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
      },
    });
    
    return response.data.urls.regular;
  } catch (error) {
    console.error('Unsplash API error:', error.message);
    return null;
  }
}

async function getPexelsImage() {
  try {
    const query = 'blockchain technology AI security';
    const response = await axios.get('https://api.pexels.com/v1/search', {
      params: {
        query,
        per_page: 1,
        orientation: 'landscape',
      },
      headers: {
        Authorization: process.env.PEXELS_API_KEY,
      },
    });
    
    if (response.data.photos && response.data.photos.length > 0) {
      return response.data.photos[0].src.large;
    }
    return null;
  } catch (error) {
    console.error('Pexels API error:', error.message);
    return null;
  }
}

async function generateDALLEImage() {
  try {
    const { default: OpenAI } = await import('openai');
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const response = await openai.images.generate({
      model: 'dall-e-3',
      prompt: 'Abstract minimalist background with AI and blockchain technology elements. Subtle neural network patterns, blockchain nodes, and digital connections. Very subtle, professional, clean design. Soft gradients in blue, purple, and teal tones. Blurred, dreamy aesthetic. No text, no people, just abstract tech patterns.',
      size: '1792x1024',
      quality: 'standard',
      n: 1,
    });

    return response.data[0].url;
  } catch (error) {
    console.error('DALL-E API error:', error.message);
    return null;
  }
}

async function downloadImage(url, filepath) {
  try {
    const response = await axios.get(url, {
      responseType: 'arraybuffer',
    });
    fs.writeFileSync(filepath, response.data);
    console.log(`Image saved to ${filepath}`);
    return true;
  } catch (error) {
    console.error('Download error:', error.message);
    return false;
  }
}

async function main() {
  console.log('Generating hero background image...');
  
  // Try DALL-E first, then fallback to Unsplash/Pexels
  let imageUrl = await generateDALLEImage();
  
  if (!imageUrl) {
    console.log('DALL-E failed, trying Unsplash...');
    imageUrl = await getUnsplashImage();
  }
  
  if (!imageUrl) {
    console.log('Unsplash failed, trying Pexels...');
    imageUrl = await getPexelsImage();
  }
  
  if (imageUrl) {
    const publicDir = path.join(__dirname, '..', 'public');
    const imagePath = path.join(publicDir, 'hero-background.jpg');
    
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }
    
    await downloadImage(imageUrl, imagePath);
    console.log('Hero background image generated successfully!');
  } else {
    console.log('All image sources failed. Using CSS gradient fallback.');
  }
}

main().catch(console.error);

