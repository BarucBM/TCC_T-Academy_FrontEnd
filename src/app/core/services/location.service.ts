import { Injectable } from '@angular/core';
import { Coordinates } from '../models/coordinates.model';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private coordinates: Coordinates = {
    lat: 0,
    lon: 0
  };

  constructor() {}

  getCurrentLocation(): Observable<Coordinates> {
    const subject = new Subject<Coordinates>();
    if (typeof navigator !== 'undefined' && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const coordinates: Coordinates = {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          };
          subject.next(coordinates);
          subject.complete();
        },
        error => {
          subject.error(`Erro ao obter localização: ${error.message}`);
        }
      );
    }
    return subject.asObservable();
  }
}