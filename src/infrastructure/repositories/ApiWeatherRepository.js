import { WeatherRepository } from '../../domain/repositories/WeatherRepository';
import { Weather } from '../../domain/entities/Weather';

export class ApiWeatherRepository extends WeatherRepository {
  async fetchWeather(lat, lon) {
    try {
      const response = await fetch(`/api/weather?lat=${lat}&lon=${lon}`);
      
      if (!response.ok) {
        throw new Error('Weather request failed');
      }

      const data = await response.json();
      return new Weather({
        temp: data.temp,
        condition: data.condition,
        source: data.source
      });
    } catch (err) {
      console.error('Failed to retrieve live weather', err);
      throw err;
    }
  }
}
