import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserProfile } from '../../../core/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url: string = "http://localhost:8080/user";

  constructor(private httpClient: HttpClient) { }

  getProfile(): Observable<UserProfile> {
    return this.httpClient.get<UserProfile>(`${this.url}/profile`);
  }

  uploadPhoto(userId: string, file: FormData): Observable<string> {
    return this.httpClient.post<string>(`${this.url}/${userId}/upload-photo`, file);
  }

  removePhoto(userId: string): Observable<string> {
    return this.httpClient.delete<string>(`${this.url}/${userId}/remove-photo`);
  }
}
