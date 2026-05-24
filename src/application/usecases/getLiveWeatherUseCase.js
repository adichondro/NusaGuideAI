export class GetLiveWeatherUseCase {
  constructor(weatherRepository) {
    this.weatherRepository = weatherRepository;
  }

  async execute(lat, lon) {
    return await this.weatherRepository.fetchWeather(lat, lon);
  }
}
