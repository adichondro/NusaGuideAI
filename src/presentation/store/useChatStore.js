import { create } from 'zustand';
import { ApiChatRepository } from '../../infrastructure/repositories/ApiChatRepository';
import { SendMessageUseCase } from '../../application/usecases/sendMessageUseCase';
import { useConfigStore } from './useConfigStore';

const chatRepository = new ApiChatRepository(() => useConfigStore.getState().apiKey);
const sendMessageUseCase = new SendMessageUseCase(chatRepository);

// High-fidelity Mock Database for Indonesian popular destinations (Demo Mode)
const mockItineraries = {
  bandung: {
    title: "Bandung 2-Day Lembang Healing Trip",
    destination: "Bandung",
    duration_days: 2,
    budget_estimate: { hotel: 450000, transportation: 300000, food: 350000, tickets: 200000 },
    weather_forecast: {
      condition: "Cool & Cloudy",
      temperature: "22°C",
      recommendation: "Perfect for nature walks! Lembang gets chilly in the late afternoon, so pack a light jacket or sweater."
    },
    locations: [
      { name: "Tangkuban Perahu Crater", latitude: -6.7596, longitude: 107.6097, day: 1, description: "Breathtaking views of Bandung's active volcano." },
      { name: "Floating Market Lembang", latitude: -6.8188, longitude: 107.6186, day: 1, description: "Scenic floating food stalls with local Sundanese snacks." },
      { name: "Kawah Putih Ciwidey", latitude: -7.1662, longitude: 107.4021, day: 2, description: "Stunning turquoise volcanic crater lake in Southern Bandung." },
      { name: "Ranca Upas Deer Conservation", latitude: -7.1382, longitude: 107.3922, day: 2, description: "Feed friendly deer and enjoy local strawberry farms." }
    ],
    itinerary: [
      {
        day: 1,
        activities: [
          { time: "08:00 - 10:00", activity: "Depart from city center and travel up the mountain road to Lembang", location: "Tangkuban Perahu road" },
          { time: "10:00 - 12:00", activity: "Explore the rim of the main crater at Tangkuban Perahu", location: "Tangkuban Perahu Crater" },
          { time: "12:30 - 15:00", activity: "Have lunch on boats and paddle at the Floating Market Lembang", location: "Floating Market Lembang" },
          { time: "15:30 - 17:30", activity: "Visit Farmhouse Susu Lembang for fresh milk and European-style gardens", location: "Lembang" },
          { time: "19:00 - 21:00", activity: "Enjoy a warm dinner of Sundanese roasted chicken (Ayam Bakar) at a hillside cafe", location: "Lembang" }
        ]
      },
      {
        day: 2,
        activities: [
          { time: "08:00 - 10:00", activity: "Scenic morning drive south towards the volcanic forest of Ciwidey", location: "Ciwidey" },
          { time: "10:00 - 12:30", activity: "Walk around the mist-covered volcanic lake of Kawah Putih", location: "Kawah Putih Ciwidey" },
          { time: "12:45 - 14:15", activity: "Traditional Sundanese lunch with hot tea in a lake-facing gazebo", location: "Ciwidey" },
          { time: "14:30 - 16:30", activity: "Feed the deer and take scenic photos among pine trees at Ranca Upas", location: "Ranca Upas Deer Conservation" },
          { time: "17:00 - 19:00", activity: "Pick fresh strawberries at a local community farm before returning to Bandung", location: "Ciwidey" }
        ]
      }
    ]
  },
  bali: {
    title: "Bali 3-Day Tropical Adventure",
    destination: "Bali",
    duration_days: 3,
    budget_estimate: { hotel: 1200000, transportation: 450000, food: 600000, tickets: 250000 },
    weather_forecast: {
      condition: "Sunny & Humid",
      temperature: "30°C",
      recommendation: "Perfect beach weather! Wear sunscreen, stay hydrated, and plan outdoor walks in the morning or near sunset."
    },
    locations: [
      { name: "Ubud Sacred Monkey Forest", latitude: -8.5194, longitude: 115.2606, day: 1, description: "Ancient temple complex surrounded by giant nutmeg trees and monkeys." },
      { name: "Tegallalang Rice Terraces", latitude: -8.4350, longitude: 115.2785, day: 1, description: "Beautiful terraced valley paddy fields with swings." },
      { name: "Tanah Lot Sunset Temple", latitude: -8.6212, longitude: 115.0868, day: 2, description: "Scenic sea temple sitting on a coastal rock formation." },
      { name: "Seminyak Beachfront", latitude: -8.6913, longitude: 115.1558, day: 2, description: "Lively beach strip with vibrant sunset lounges." },
      { name: "Uluwatu Cliff Temple", latitude: -8.8291, longitude: 115.0849, day: 3, description: "Stunning sea temple perched 70 meters above crashing waves." }
    ],
    itinerary: [
      {
        day: 1,
        activities: [
          { time: "09:00 - 11:30", activity: "Walk the shaded paths of Ubud Monkey Forest and photograph the stone carvings", location: "Ubud Sacred Monkey Forest" },
          { time: "12:00 - 13:30", activity: "Enjoy a local roasted pork (Babi Guling) or vegan lunch in Ubud center", location: "Ubud" },
          { time: "14:00 - 16:30", activity: "Trek the lush trails of Tegallalang and try the iconic canyon valley swing", location: "Tegallalang Rice Terraces" },
          { time: "17:00 - 18:30", activity: "Sunset walk along Campuhan Ridge overlooking river gorges", location: "Campuhan Ridge" }
        ]
      },
      {
        day: 2,
        activities: [
          { time: "09:00 - 12:00", activity: "Visit the historic royal temple of Taman Ayun in Mengwi", location: "Taman Ayun" },
          { time: "12:30 - 14:00", activity: "Lunch at a traditional organic farm restaurant in Canggu", location: "Canggu" },
          { time: "15:00 - 17:30", activity: "Photograph the waves wrapping around the unique sea temple at Tanah Lot", location: "Tanah Lot Sunset Temple" },
          { time: "18:00 - 20:30", activity: "Relax with mocktails on beanbags under colorful umbrellas at Seminyak Coast", location: "Seminyak Beachfront" }
        ]
      },
      {
        day: 3,
        activities: [
          { time: "10:00 - 13:00", activity: "Browse local arts and crafts boutiques in Seminyak and Petitenget", location: "Seminyak" },
          { time: "13:30 - 15:30", activity: "Coastal seafood lunch at Jimbaran Bay with table on the sand", location: "Jimbaran Bay" },
          { time: "16:30 - 18:00", activity: "Visit Uluwatu temple and watch the panoramic cliff views", location: "Uluwatu Cliff Temple" },
          { time: "18:00 - 19:30", activity: "Watch the traditional fire dance (Kecak Dance) against the sunset background", location: "Uluwatu Cliff Temple" }
        ]
      }
    ]
  },
  yogyakarta: {
    title: "Yogyakarta 2-Day Cultural Journey",
    destination: "Yogyakarta",
    duration_days: 2,
    budget_estimate: { hotel: 500000, transportation: 250000, food: 200000, tickets: 350000 },
    weather_forecast: {
      condition: "Warm & Clear",
      temperature: "28°C",
      recommendation: "Sunny days are common. Wear a wide-brim hat, sunglasses, and carry a water bottle when walking temples."
    },
    locations: [
      { name: "Borobudur Temple", latitude: -7.6079, longitude: 110.2038, day: 1, description: "World's largest Buddhist temple with magnificent bas-reliefs." },
      { name: "Prambanan Temple Complex", latitude: -7.7520, longitude: 110.4915, day: 1, description: "Stunning towering spires of the largest Hindu temple in Indonesia." },
      { name: "Keraton Yogyakarta Palace", latitude: -7.8052, longitude: 110.3642, day: 2, description: "Historical seat of the reigning Sultan of Yogyakarta." },
      { name: "Malioboro Shopping Street", latitude: -7.7926, longitude: 110.3658, day: 2, description: "Vibrant shopping road with traditional horse carts and street batik stalls." }
    ],
    itinerary: [
      {
        day: 1,
        activities: [
          { time: "08:00 - 11:30", activity: "Explore the stone corridors and climb the majestic terraces of Borobudur", location: "Borobudur Temple" },
          { time: "12:00 - 13:30", activity: "Lunch of local coconut chicken soup (Soto` Kadipiro) nearby", location: "Yogyakarta" },
          { time: "14:30 - 17:00", activity: "Tour the towering stone temples of Prambanan and listen to ancient folklore", location: "Prambanan Temple Complex" },
          { time: "18:30 - 21:00", activity: "Dine on traditional sweet jackfruit stew (Gudeg Yu Djum) in Wijilan", location: "Wijilan Gudeg Area" }
        ]
      },
      {
        day: 2,
        activities: [
          { time: "09:00 - 11:30", activity: "Walk the palace halls at Keraton and observe royal guards in traditional attire", location: "Keraton Yogyakarta Palace" },
          { time: "11:45 - 13:00", activity: "Visit Taman Sari Water Castle and explore the underground mosque chambers", location: "Taman Sari Water Castle" },
          { time: "13:30 - 15:00", activity: "Try a local Javanese lunch and buy traditional bakpia pastries for snacks", location: "Malioboro" },
          { time: "15:30 - 18:30", activity: "Ride a horse carriage (Andong) and shop batik along Malioboro Road", location: "Malioboro Shopping Street" },
          { time: "19:00 - 21:00", activity: "Relax with local coffee charcoal (Kopi Joss) at a street-side Angkringan tent", location: "Malioboro Station area" }
        ]
      }
    ]
  },
  bogor: {
    title: "Bogor 1-Day Refreshing Escape",
    destination: "Bogor",
    duration_days: 1,
    budget_estimate: { hotel: 0, transportation: 150000, food: 120000, tickets: 80000 },
    weather_forecast: {
      condition: "Tropical Rain Showers",
      temperature: "24°C",
      recommendation: "Bogor is the 'Rain City'. Showers are highly likely in the afternoon, so pack an umbrella and schedule indoor cafe breaks after 2 PM."
    },
    locations: [
      { name: "Bogor Botanical Gardens", latitude: -6.5982, longitude: 106.8022, day: 1, description: "Historical giant park with thousands of tropical trees." },
      { name: "Puncak Pass Tea Plantation", latitude: -6.7022, longitude: 106.9897, day: 1, description: "Lush rolling tea fields wrapping the cool mountain slopes." }
    ],
    itinerary: [
      {
        day: 1,
        activities: [
          { time: "08:30 - 11:30", activity: "Walk around the giant lily pads, palm tree avenues, and heritage presidential palace lake", location: "Bogor Botanical Gardens" },
          { time: "11:45 - 13:15", activity: "Lunch featuring local Bogor pickles (Asinan Bogor) and grilled bean curd (Toge Goreng)", location: "Bogor Center" },
          { time: "14:00 - 16:30", activity: "Drive up the mountains to Puncak Pass, walk the tea gardens, and sip hot ginger tea", location: "Puncak Pass Tea Plantation" },
          { time: "17:00 - 18:30", activity: "Grab delicious local street snack Roti Unyil (mini buns) before heading back", location: "Bogor city exit" }
        ]
      }
    ]
  }
};

export const useChatStore = create((set, get) => ({
  chatHistory: [],
  isTyping: false,

  addMessage: (role, content) => {
    set((state) => ({
      chatHistory: [...state.chatHistory, { role, content }]
    }));
  },

  clearHistory: () => {
    set({ chatHistory: [] });
  },

  sendMessage: async (promptText) => {
    const { chatHistory, addMessage } = get();
    const demoMode = useConfigStore.getState().demoMode;

    addMessage('user', promptText);
    set({ isTyping: true });

    try {
      if (demoMode) {
        const lowerPrompt = promptText.toLowerCase();
        const isPlanRequest = lowerPrompt.includes('plan') || lowerPrompt.includes('itinerary') || lowerPrompt.includes('perjalanan') || lowerPrompt.includes('buat') || lowerPrompt.includes('trip');
        
        let matchedDest = null;
        if (lowerPrompt.includes('bali')) matchedDest = 'bali';
        else if (lowerPrompt.includes('bandung')) matchedDest = 'bandung';
        else if (lowerPrompt.includes('yogyakarta') || lowerPrompt.includes('jogja')) matchedDest = 'yogyakarta';
        else if (lowerPrompt.includes('bogor')) matchedDest = 'bogor';

        await new Promise(resolve => setTimeout(resolve, 1200));

        if (isPlanRequest && matchedDest) {
          const plan = JSON.parse(JSON.stringify(mockItineraries[matchedDest]));
          const reply = `Plan generated: Wonderful Indonesia custom Adventure Plan! 🌴🇮🇩\n\nHere is your mock plan for ${plan.destination}.`;
          addMessage('model', reply);
          set({ isTyping: false });
          return { type: 'itinerary', reply, plan };
        } else {
          const reply = `Halo! I am NusaGuide AI in Demo Mode. 🇮🇩\n\nTo plan a custom trip to any destination, please configure your Gemini API Key in the settings or add it to the server .env file. Since you are in Demo Mode, you can try asking me to plan a trip for **Bali**, **Bandung**, **Yogyakarta**, or **Bogor** to see how the interactive maps and budget tracker work!`;
          addMessage('model', reply);
          set({ isTyping: false });
          return { type: 'chat', reply };
        }
      } else {
        const response = await sendMessageUseCase.execute(promptText, chatHistory);
        if (response && response.reply) {
          addMessage('model', response.reply);
          set({ isTyping: false });
          return response;
        } else {
          throw new Error('Maaf, I ran into an error generating a response.');
        }
      }
    } catch (err) {
      set({ isTyping: false });
      const errorMsg = err.message || 'Failed to connect to NusaGuide AI service.';
      addMessage('model', `System: ${errorMsg}`);
      throw err;
    }
  }
}));
