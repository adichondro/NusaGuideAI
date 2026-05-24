import React from 'react';
import { useNavigate } from 'react-router-dom';
import { usePlanStore } from '../store/usePlanStore';
import { Button } from '../components/atoms/Button';
import { Compass, Sparkles, Map, CloudSun, DollarSign, ArrowRight } from 'lucide-react';

// Import local thumbnails
import bandungImg from '../../assets/bandung.png';
import baliImg from '../../assets/bali.png';
import yogyakartaImg from '../../assets/yogyakarta.png';
import bogorImg from '../../assets/bogor.png';

export function DiscoverPage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Sparkles className="w-5 h-5 text-amber-400" />,
      title: "AI Itinerary Builder",
      desc: "Describe your travel style and NusaGuide AI drafts day-by-day schedules custom-tailored for you."
    },
    {
      icon: <Map className="w-5 h-5 text-blue-400" />,
      title: "Interactive Map Paths",
      desc: "See daily route path polyline connections and interactive location markers automatically drawn on OpenStreetMap."
    },
    {
      icon: <CloudSun className="w-5 h-5 text-emerald-400" />,
      title: "Live Weather Updates",
      desc: "Resolves current weather patterns at your destination and alerts you with guidance if heavy rains are forecast."
    },
    {
      icon: <DollarSign className="w-5 h-5 text-pink-400" />,
      title: "Budget Breakdown",
      desc: "Tracks hotel, transport, tickets, and dining expenses in Indonesian Rupiah with interactive progress bars."
    }
  ];

  const popularDestinations = [
    {
      id: 'bandung',
      name: 'Bandung',
      img: bandungImg,
      desc: 'Cool mountain air, crater lakes, tea plantations, and chic factory outlets.',
      prompt: 'Plan a 2-day vacation in Bandung focusing on nature and family cafes.'
    },
    {
      id: 'bali',
      name: 'Bali',
      img: baliImg,
      desc: 'Golden beaches, ancient temples, lush rice terraces, and volcanic hills.',
      prompt: 'Plan a 3-day tropical adventure in Bali. Focus on Ubud nature trails and Uluwatu sunsets.'
    },
    {
      id: 'yogyakarta',
      name: 'Yogyakarta',
      img: yogyakartaImg,
      desc: 'Rich cultural heritage, historic royal palaces, and majestic stone temples.',
      prompt: 'Plan a 2-day cultural journey in Yogyakarta. I want to see Borobudur and try local Gudeg.'
    },
    {
      id: 'bogor',
      name: 'Bogor',
      img: bogorImg,
      desc: 'The Rain City: grand botanical gardens, waterfalls, and scenic mountain pass paths.',
      prompt: 'Plan a 1-day refreshing escape in Bogor. I want to visit the Botanical Gardens.'
    }
  ];

  const handlePlanTrip = (promptText) => {
    navigate('/planner', { state: { initialPrompt: promptText } });
  };

  return (
    <div className="flex flex-col gap-16 pb-12 animate-[slideInPage_0.3s_cubic-bezier(0.4,0,0.2,1)_forwards]">
      {/* Hero Section */}
      <section className="relative glass-panel rounded-3xl p-8 md:p-12 overflow-hidden flex flex-col items-center text-center gap-6 border border-outline">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10 opacity-30 pointer-events-none" />
        
        <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-primary/10 border border-primary/20 text-primary">
          <Sparkles className="w-3.5 h-3.5" /> Your Smart Indonesian Travel Guide
        </span>
        
        <h1 className="text-3xl md:text-5xl font-black text-on-surface max-w-3xl leading-tight tracking-tight">
          Explore Nusantara, Guided by AI
        </h1>
        
        <p className="text-sm md:text-base text-on-surface-variant max-w-2xl leading-relaxed">
          NusaGuide AI drafts detailed custom itineraries, tracks your trip budget, checks real-time local weather forecasts, and visualizes destinations on interactive maps.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mt-2">
          <Button
            size="lg"
            onClick={() => handlePlanTrip('')}
            icon={Compass}
          >
            Start Planning Now
          </Button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="flex flex-col gap-6">
        <h2 className="text-xl font-bold text-on-surface flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          <span>Core Capabilities</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, idx) => (
            <div key={idx} className="glass-panel p-6 rounded-2xl border border-outline flex flex-col gap-3">
              <div className="bg-surface-container-high p-2.5 rounded-xl border border-outline/10 w-fit">
                {f.icon}
              </div>
              <h3 className="text-sm font-bold text-on-surface mt-1">{f.title}</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Destinations Portals */}
      <section className="flex flex-col gap-6">
        <h2 className="text-xl font-bold text-on-surface flex items-center gap-2">
          <Compass className="w-5 h-5 text-primary" />
          <span>Popular Destinations</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularDestinations.map((d) => (
            <div
              key={d.id}
              className="glass-panel glass-panel-interactive rounded-2xl overflow-hidden border border-outline flex flex-col h-full"
            >
              <div className="h-44 w-full relative overflow-hidden bg-surface-container">
                <img
                  src={d.img}
                  alt={d.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="p-5 flex flex-col justify-between flex-grow gap-4">
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-base font-bold text-on-surface">{d.name}</h3>
                  <p className="text-xs text-on-surface-variant leading-relaxed">{d.desc}</p>
                </div>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handlePlanTrip(d.prompt)}
                  className="w-full flex items-center justify-between"
                >
                  <span>Plan Trip</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
