import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

// Initialize environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

console.log('--- ENV CHECK ---');
console.log('GEMINI_API_KEY:', process.env.GEMINI_API_KEY ? 'Present' : 'Missing');
console.log('OPENWEATHER_API_KEY:', process.env.OPENWEATHER_API_KEY ? 'Present' : 'Missing');
console.log('-----------------');

// Enable CORS and JSON parsing middlewares
app.use(cors());
app.use(express.json());

// Serve static frontend assets from the Vite dist folder
app.use(express.static(path.join(__dirname, 'dist')));

// 1. API Status check endpoint
app.get('/api/status', (req, res) => {
  dotenv.config({ override: true });
  res.json({
    geminiActive: !!process.env.GEMINI_API_KEY,
    openWeatherActive: !!process.env.OPENWEATHER_API_KEY
  });
});

// Helper to clean Markdown code block wrappers and parse JSON safely
function cleanAndParseJSON(text) {
  if (!text) throw new Error("Empty response text");
  
  let cleanText = text.trim();
  
  // Try normal JSON parsing first
  try {
    const startIdx = cleanText.indexOf('{');
    const endIdx = cleanText.lastIndexOf('}');
    if (startIdx !== -1 && endIdx !== -1 && endIdx > startIdx) {
      cleanText = cleanText.substring(startIdx, endIdx + 1);
    }
    return JSON.parse(cleanText);
  } catch (parseErr) {
    console.warn("Standard JSON.parse failed. Attempting regex extraction fallback...", parseErr.message);
    
    // Fallback regex matching for type and reply
    const typeMatch = cleanText.match(/"type"\s*:\s*"((?:[^"\\]|\\.)*)"/);
    const replyMatch = cleanText.match(/"reply"\s*:\s*"((?:[^"\\]|\\.)*)"/);
    
    if (replyMatch) {
      const typeVal = typeMatch ? JSON.parse('"' + typeMatch[1] + '"') : "chat";
      
      // Escape raw unescaped newlines/carriage returns in the reply body
      let rawReply = replyMatch[1];
      rawReply = rawReply.replace(/\n/g, '\\n').replace(/\r/g, '\\r');
      
      const replyVal = JSON.parse('"' + rawReply + '"');
      
      // If it's an itinerary type, we must also extract and parse the nested plan object
      if (typeVal === "itinerary") {
        const planStart = cleanText.indexOf('"plan"');
        if (planStart !== -1) {
          const planSub = cleanText.substring(planStart);
          const firstBrace = planSub.indexOf('{');
          const lastBrace = planSub.lastIndexOf('}');
          if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
            try {
              const planObj = JSON.parse(planSub.substring(firstBrace, lastBrace + 1));
              return {
                type: typeVal,
                reply: replyVal,
                plan: planObj
              };
            } catch (planErr) {
              console.warn("Failed to parse extracted plan object", planErr.message);
            }
          }
        }
      }
      
      return {
        type: typeVal,
        reply: replyVal
      };
    }
    
    // Re-throw if regex extraction itself fails
    throw parseErr;
  }
}

// 2. Gemini Chat Route
app.post('/api/chat', async (req, res) => {
  const { message, history } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  dotenv.config({ override: true });
  const apiKey = req.headers['x-gemini-api-key'] || process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn('[Server Warning] Gemini API Key is missing');
    return res.status(500).json({
      error: 'Gemini API Key is not configured on the server. Please add it to your .env file.'
    });
  }

  const systemInstructions = `You are NusaGuide AI, a friendly and informative Indonesian local travel guide companion.
Your job is to chat with the user, answer their questions, provide local advice, and help them plan trips in Indonesia.

You MUST respond in JSON format ONLY. Your response must be a single JSON object with the following structure:
- If the user is NOT asking to create, generate, or finalize an itinerary/travel plan (either directly in their current message or by referring to what was discussed in the chat history):
  {
    "type": "chat",
    "reply": "Your warm, helpful conversational reply in Indonesian/English. Use standard markdown formatting inside the string for bullet points or bold text."
  }

- If the user IS asking to create, generate, or finalize an itinerary/travel plan (e.g. they ask 'buatkan itinerary', 'plan a trip to...', 'generate the itinerary from this chat', etc.), analyze the previous conversation context and latest message to extract the destination, duration, budget, and preferences. Generate a detailed, high-quality, Leaflet-map-ready travel plan.
  {
    "type": "itinerary",
    "reply": "A warm message in Indonesian/English confirming you have generated their travel plan.",
    "plan": {
      "title": "A descriptive, attractive title for the trip (e.g., 'Bandung 2-Day Nature & Culinary Escape')",
      "destination": "The destination city or region in Indonesia (e.g., 'Bandung')",
      "duration_days": 2, // Integer number of days
      "budget_estimate": {
        "hotel": 500000, // Estimated lodging budget in IDR (integer)
        "transportation": 300000, // Estimated transport budget in IDR (integer)
        "food": 400000, // Estimated food budget in IDR (integer)
        "tickets": 150000 // Estimated tickets/admission budget in IDR (integer)
      },
      "weather_forecast": {
        "condition": "Partly Cloudy", // Expected weather condition: Sunny, Cloudy, Rainy, Clear Sky, Partly Cloudy, Drizzle, etc.
        "temperature": "24°C", // Temperature in Celsius
        "recommendation": "A friendly weather-specific local recommendation from NusaGuide."
      },
      "locations": [
        {
          "name": "Exact location name, e.g. Kawah Putih",
          "latitude": -7.1662, // Real coordinate latitude in Indonesia (float)
          "longitude": 107.4021, // Real coordinate longitude in Indonesia (float)
          "day": 1, // The day number this location is visited (integer)
          "description": "Short description of what the location is."
        }
      ],
      "itinerary": [
        {
          "day": 1,
          "activities": [
            {
              "time": "08:00 - 10:00", // Time slot string
              "activity": "Detailed description of the activity.",
              "location": "Exact location name matching the one in the locations list"
            }
          ]
        }
      ]
    }
  }

Ensure that:
1. Every location in the 'locations' list has accurate and valid latitude and longitude coordinates in Indonesia.
2. The times and locations in the 'itinerary' list align with the locations defined in the 'locations' list.
3. The budget estimates are realistic integer values in IDR (Indonesian Rupiah).
4. You return valid JSON matching this schema exactly. Do not include any text outside of the JSON block.`;

  // Format chat history for Gemini API
  const contents = [];
  if (Array.isArray(history)) {
    history.forEach(turn => {
      const role = turn.role === 'ai' || turn.role === 'model' ? 'model' : 'user';
      contents.push({
        role: role,
        parts: [{ text: turn.content }]
      });
    });
  }
  contents.push({
    role: 'user',
    parts: [{ text: message }]
  });

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-3.1-flash-lite',
      contents: contents,
      config: {
        systemInstruction: systemInstructions,
        responseMimeType: 'application/json'
      }
    });

    const rawText = response.text;
    if (!rawText) {
      throw new Error('Empty response from AI.');
    }

    try {
      const parsed = cleanAndParseJSON(rawText);
      res.json(parsed);
    } catch (parseErr) {
      console.warn('Failed to parse AI response as JSON. Returning fallback chat response. Error:', parseErr.message, 'Raw text:', rawText);
      res.json({
        type: 'chat',
        reply: rawText
      });
    }
  } catch (err) {
    console.error('Error in Gemini Chat API:', err.message);
    res.status(500).json({ error: 'Failed to get response from AI. ' + err.message });
  }
});

// 3. OpenWeather Integration Route with free fallback to Open-Meteo
app.get('/api/weather', async (req, res) => {
  const { lat, lon } = req.query;

  if (!lat || !lon) {
    return res.status(400).json({ error: 'Latitude (lat) and longitude (lon) are required parameters.' });
  }

  dotenv.config({ override: true });
  const apiKey = process.env.OPENWEATHER_API_KEY;

  if (!apiKey) {
    console.log('[Server Info] OpenWeather Key is missing. Using Open-Meteo fallback API.');
    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
      const response = await fetch(url);
      if (!response.ok) throw new Error('Open-Meteo fallback failed');
      const data = await response.json();

      if (data && data.current_weather) {
        const temp = Math.round(data.current_weather.temperature);
        const code = data.current_weather.weathercode;
        return res.json({
          temp: `${temp}°C`,
          condition: translateWeatherCode(code),
          source: 'Open-Meteo Fallback'
        });
      }
    } catch (err) {
      console.error('Open-Meteo fallback request failed:', err.message);
      return res.status(500).json({ error: 'Failed to retrieve weather from fallback API.' });
    }
  } else {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('OpenWeather API request failed');
      }

      const data = await response.json();
      const temp = Math.round(data.main.temp);
      const condition = data.weather[0].main;

      res.json({
        temp: `${temp}°C`,
        condition: translateWeatherCondition(condition),
        source: 'OpenWeather API'
      });
    } catch (err) {
      console.error('OpenWeather API request failed:', err.message);
      res.status(500).json({ error: 'Failed to retrieve weather from OpenWeather API. ' + err.message });
    }
  }
});

// Helper: Translate weather codes from Open-Meteo
function translateWeatherCode(code) {
  if (code === 0) return "Clear Sky";
  if (code >= 1 && code <= 3) return "Partly Cloudy";
  if (code === 45 || code === 48) return "Foggy";
  if (code >= 51 && code <= 55) return "Light Drizzle";
  if (code >= 56 && code <= 57) return "Freezing Drizzle";
  if (code >= 61 && code <= 65) return "Rainy";
  if (code >= 66 && code <= 67) return "Freezing Rain";
  if (code >= 71 && code <= 77) return "Snowy";
  if (code >= 80 && code <= 82) return "Rain Showers";
  if (code >= 85 && code <= 86) return "Snow Showers";
  if (code >= 95 && code <= 99) return "Thunderstorm";
  return "Cloudy";
}

// Helper: Standardize conditions from OpenWeather
function translateWeatherCondition(cond) {
  const map = {
    'Clear': 'Clear Sky',
    'Clouds': 'Partly Cloudy',
    'Drizzle': 'Light Drizzle',
    'Rain': 'Rain Showers',
    'Thunderstorm': 'Thunderstorm',
    'Snow': 'Snowy',
    'Mist': 'Foggy',
    'Smoke': 'Foggy',
    'Haze': 'Foggy',
    'Dust': 'Foggy',
    'Fog': 'Foggy',
    'Sand': 'Foggy',
    'Ash': 'Foggy',
    'Squall': 'Windy',
    'Tornado': 'Stormy'
  };
  return map[cond] || cond;
}

// Serve index.html for any other requests (Fallback router)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start Express Server
app.listen(PORT, () => {
  console.log(`================================================`);
  console.log(` NusaGuide AI MVP Server started successfully!   `);
  console.log(` Port: ${PORT}                                   `);
  console.log(` Address: http://localhost:${PORT}               `);
  console.log(`================================================`);
});
