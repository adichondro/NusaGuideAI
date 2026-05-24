export class Weather {
  constructor({ temp, condition, source }) {
    this.temp = temp || '28°C';
    this.condition = condition || 'Partly Cloudy';
    this.source = source || 'Fallback';
  }
}
