import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SendActive } from '../models/preference.model';
import { error } from 'console';

@Injectable({
  providedIn: 'root'
})
export class PreferenceserviceService {
  private url: string = 'http://localhost:8080/preference';


  constructor(private http: HttpClient) { }

    updatePreference(userId: String, preference:SendActive){
      this.http.put(this.url+`/${userId}`, preference).subscribe(
        response => console.log('preference updated'),
        error => console.log(error)
      );
    }

}
