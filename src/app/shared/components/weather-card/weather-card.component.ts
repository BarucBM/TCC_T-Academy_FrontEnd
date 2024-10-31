import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { WeatherApiRes } from '../../../core/models/weather-api-res.model';
import { WeatherService } from '../../../core/services/weather.service';
import { SharedModule } from '../../modules/shared.module';

@Component({
  selector: 'app-weather-card',
  standalone: true,
  imports: [SharedModule, CardModule],
  templateUrl: './weather-card.component.html',
  styleUrl: './weather-card.component.scss'
})
export class WeatherCardComponent {
  currentWeather: WeatherApiRes = {
    coord: {
      lon: 0,
      lat: 0
    },
    weather: [
      {
        id: 0,
        main: '',
        description: '',
        icon: ''
      }
    ],
    base: '',
    main: {
      temp: 0,
      feels_like: 0,
      temp_min: 0,
      temp_max: 0,
      pressure: 0,
      humidity: 0,
      sea_level: 0,
      grnd_level: 0
    },
    visibility: 0,
    wind: {
      speed: 0,
      deg: 0,
      gust: 0
    },
    rain: {
      '1h': 0
    },
    clouds: {
      all: 0
    },
    dt: 0,
    sys: {
      type: 0,
      id: 0,
      country: '',
      sunrise: 0,
      sunset: 0
    },
    timezone: 0,
    id: 0,
    name: '',
    cod: 0
  };

  lat = '';
  lon = '';

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.getCurrentLocation();
  }

  getCurrentLocation(): void {
    if (typeof navigator !== 'undefined') {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude.toString();
        this.lon = position.coords.longitude.toString();
        this.weatherService.getCurrentWeather(this.lat, this.lon).subscribe(
          (response) => {
            this.currentWeather = response;
            this.currentWeather.main.temp = Math.round(this.currentWeather.main.temp - 273.15);
            this.currentWeather.main.temp_max = Math.round(this.currentWeather.main.temp_max - 273.15);
            this.currentWeather.main.temp_min = Math.round(this.currentWeather.main.temp_min - 273.15);
          },
          (error) => {
            console.error('Erro ao carregar os dados: ', error);
          }
        );
      });
    }
  }

}
