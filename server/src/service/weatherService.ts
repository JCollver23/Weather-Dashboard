import dotenv from 'dotenv';
dotenv.config();

// DONE: Define an interface for the Coordinates object
interface Coordinates {
  name: string;
  lat: number;
  lon: number;
}

// DONE: Define a class for the Weather object
class Weather {
  city: string;
  date: number;
  temp: number;
  windSpeed: number;
  humidity: number;
  icon: string; 
  iconDescription: string;

  constructor(
    city: string, 
    date: number, 
    temp: number, 
    windSpeed: number,
    humidity: number, 
    icon: string,  
    iconDescription: string
  ) {
    this.city = city;
    this.date = date;
    this.temp = temp;
    this.windSpeed = windSpeed;
    this.humidity = humidity;
    this.icon = icon; 
    this.iconDescription = iconDescription;
  }
}

// DONE: Complete the WeatherService class
class WeatherService {
  private baseURL: string = 'https://api.openweathermap.org/data/2.5/';
  private apiKey: string = process.env.API_KEY || '';  
  private cityName: string = '';

  constructor(city: string) {
    this.cityName = city;
  }

  // DONE: Create fetchLocationData method
  private async fetchLocationData(query: string) {
    const response = await fetch(`${this.baseURL}geo/1.0/direct?q=${query}&limit=1&appid=${this.apiKey}`);
    const data = await response.json();
    return data[0]; 
  }

  // DONE: Create destructureLocationData method
  private destructureLocationData(locationData: any): Coordinates {
    return {
      name: locationData.name,
      lat: locationData.lat,
      lon: locationData.lon,
    };
  }

  // DONE: Create buildGeocodeQuery method
  private buildGeocodeQuery(): string {
    return `${this.cityName}&limit=1`;
  }

  // DONE: Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {
    return `weather?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.apiKey}&units=metric`;
  }

  // DONE: Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData() {
    const locationData = await this.fetchLocationData(this.buildGeocodeQuery());
    return this.destructureLocationData(locationData);
  }

  // DONE: Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates) {
    const weatherQuery = this.buildWeatherQuery(coordinates);
    const response = await fetch(`${this.baseURL}${weatherQuery}`);
    const weatherData = await response.json();
    return weatherData;
  }

  // DONE: Build parseCurrentWeather method
  private parseCurrentWeather(response: any): Weather {
    const { name, weather, main, wind } = response;

    const icon = weather[0].icon as string; 
    const iconDescription = weather[0].description;

    return new Weather(
      name,
      Date.now(),
      main.temp,
      wind.speed,
      main.humidity,
      icon,
      iconDescription
    );
  }

  // DONE: Complete buildForecastArray method
  private buildForecastArray(currentWeather: Weather, weatherData: any[]): Weather[] {
    return weatherData.map((data: any) => new Weather(
      currentWeather.city,
      data.dt * 1000,
      data.temp.day,
      data.wind_speed,
      data.humidity,
      data.weather[0].icon,
      data.weather[0].description
    ));
  }


  // DONE: Complete getWeatherForCity method
  async getWeatherForCity(city: string): Promise<Weather[]> {
    this.cityName = city;
  
    try {
      const coordinates = await this.fetchAndDestructureLocationData();
      const weatherData = await this.fetchWeatherData(coordinates);
  
      // Assuming you want to get the forecast data, use buildForecastArray here:
      const currentWeather = this.parseCurrentWeather(weatherData);
      const forecastArray = this.buildForecastArray(currentWeather, weatherData.daily);
  
      // Return the forecast array (or you could return current weather + forecast data)
      return forecastArray;
    } catch (error) {
      console.error("Error fetching weather data: ", error);
      throw new Error("Failed to get weather data");
    }
  }
}

export default new WeatherService('');
