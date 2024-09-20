import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WeatherApiRes } from '../models/weather_api_res';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private readonly baseUrl: string = 'https://api.openweathermap.org/data/2.5/weather?';

  private readonly key: string = 'b52f290986fc32b592f0ce0de11c1363';

  constructor(private http: HttpClient) { }

  getCurrentWeather(lat: number, lon:number): Observable<WeatherApiRes> {
    const url: string = `${this.baseUrl}lat=${lat}&lon=${lon}&appid=${this.key}`;
    return this.http.get<WeatherApiRes>(url, {});
  }
}
