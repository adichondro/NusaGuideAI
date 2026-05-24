export class TripPlan {
  constructor({
    id = null,
    title,
    destination,
    duration_days,
    budget_estimate,
    weather_forecast,
    locations = [],
    itinerary = [],
    saved_at = null
  }) {
    this.id = id;
    this.title = title;
    this.destination = destination;
    this.duration_days = Number(duration_days);
    this.budget_estimate = {
      hotel: Number(budget_estimate?.hotel || 0),
      transportation: Number(budget_estimate?.transportation || 0),
      food: Number(budget_estimate?.food || 0),
      tickets: Number(budget_estimate?.tickets || 0)
    };
    this.weather_forecast = {
      condition: weather_forecast?.condition || 'Clear',
      temperature: weather_forecast?.temperature || '28°C',
      recommendation: weather_forecast?.recommendation || ''
    };
    this.locations = locations.map(loc => ({
      name: loc.name,
      latitude: Number(loc.latitude),
      longitude: Number(loc.longitude),
      day: Number(loc.day),
      description: loc.description || ''
    }));
    this.itinerary = itinerary.map(dayInfo => ({
      day: Number(dayInfo.day),
      activities: (dayInfo.activities || []).map(act => ({
        time: act.time || '',
        activity: act.activity || '',
        location: act.location || ''
      }))
    }));
    this.saved_at = saved_at;
  }

  getTotalBudget() {
    return (
      this.budget_estimate.hotel +
      this.budget_estimate.transportation +
      this.budget_estimate.food +
      this.budget_estimate.tickets
    );
  }
}
