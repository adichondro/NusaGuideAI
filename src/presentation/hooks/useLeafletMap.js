import { useEffect, useRef } from 'react';
import { usePlanStore } from '../store/usePlanStore';

export function useLeafletMap(plan) {
  const mapRef = useRef(null);
  const registerMap = usePlanStore((state) => state.registerMap);

  useEffect(() => {
    if (!mapRef.current || !plan) return;

    if (typeof window.L === 'undefined') {
      console.warn('Leaflet is not loaded on the window.');
      return;
    }

    const L = window.L;

    const points = (plan.locations || [])
      .filter(loc => typeof loc.latitude === 'number' && typeof loc.longitude === 'number')
      .map(loc => ({
        latLng: [loc.latitude, loc.longitude],
        name: loc.name,
        day: loc.day,
        desc: loc.description
      }));

    if (points.length === 0) {
      points.push({ latLng: [-2.5489, 118.0149], name: "Indonesia", day: 1, desc: "Nation-wide adventure" });
    }

    const initialCenter = points[0].latLng;

    const map = L.map(mapRef.current, {
      zoomControl: true,
      scrollWheelZoom: false
    }).setView(initialCenter, 11);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const markerIcon = L.divIcon({
      className: 'custom-map-marker',
      html: `<div style="background-color: #ef4444; color: white; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; border: 2px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.4); font-size: 13px;"><i class="fa-solid fa-location-dot"></i></div>`,
      iconSize: [28, 28],
      iconAnchor: [14, 14],
      popupAnchor: [0, -14]
    });

    const latLngs = [];

    points.forEach(point => {
      latLngs.push(point.latLng);
      L.marker(point.latLng, { icon: markerIcon })
        .addTo(map)
        .bindPopup(`
          <div style="font-family: var(--font-body); font-size:12.5px; color: #1e293b;">
            <strong style="color:var(--primary);">${point.name}</strong>
            <span class="day-badge" style="display:inline-block; font-size:9px; padding: 2px 4px; margin-left:5px; background: var(--primary); color: white; border-radius: 4px;">DAY ${point.day}</span>
            <p style="margin-top: 5px; color: #64748b; font-size:11.5px; line-height:1.4;">${point.desc}</p>
          </div>
        `);
    });

    if (latLngs.length > 1) {
      L.polyline(latLngs, {
        color: 'var(--primary)',
        weight: 3,
        opacity: 0.8,
        dashArray: '5, 10'
      }).addTo(map);

      const bounds = L.latLngBounds(latLngs);
      map.fitBounds(bounds, { padding: [30, 30], animate: false });
    }

    registerMap(plan.id, map);

    return () => {
      map.stop();
      map.remove();
    };
  }, [plan, registerMap]);

  return mapRef;
}
