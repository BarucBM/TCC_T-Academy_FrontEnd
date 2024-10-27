import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company, NewCompany } from '../../models/company.model';
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from '../models/jwt-payload.model';
import { LocalStorageService } from '../../services/local-storage.service';
import { Customer, NewCustomer } from '../../models/customer.model';
import { Login, LoginResponse } from '../models/login.model';
import { UserProfile, UserRole } from '../../models/user.model';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { ImageResponse } from '../../models/image.model';
import { ImageProcessorService } from '../../services/image-processor.service';
import { UserService } from '../../../features/user/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url: string = "http://localhost:8080/auth";
  private authTokenKey: string = "auth-token";
  userProfile: UserProfile = {
    name: '',
    email: ''
  };

  constructor(
    private httpClient: HttpClient,
    private localStorage: LocalStorageService,
    private imageProcessorService: ImageProcessorService,
    private userService: UserService
  ) { }

  init() {
    if (this.isLoggedIn()) {
      this.userService.getProfile().subscribe({
        next: (user) => {          
          this.userProfile.name = user.name;
          this.userProfile.email = user.email;
          this.userProfile.address = user.address;
          this.userProfile.role = user.role;

          if (user.image) {
            let imageRes = user.image as ImageResponse;
            this.userProfile.image = this.imageProcessorService.createImage(imageRes);
          }
        }
      })
    }    
  }

  createUserCustomer(userCustomerData: NewCustomer): Observable<Customer> {
    return this.httpClient.post<Customer>(`${this.url}/register/customer`, userCustomerData);
  }

  createUserCompany(userCompanyData: NewCompany): Observable<Company> {
    return this.httpClient.post<Company>(`${this.url}/register/company`, userCompanyData);
  }

  loginGoogle(email: string): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(`${this.url}/google-login`, email);
  }

  login(login: Login): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(`${this.url}/login`, login);
  }

  logout(): Observable<string> {
    return this.httpClient.post<string>(`${this.url}/logout`, null);
  }

  isLoggedIn(): boolean {
    return this.getAuthToken() != null;
  }

  getUserRole(): string {
    let token = this.getAuthToken();
    return token ? jwtDecode<JwtPayload>(token).role : '';
  }

  getAuthToken(): string | null {
    return this.localStorage.getItem(this.authTokenKey);
  }

  setAuthToken(token: string): void {
    this.localStorage.setItem(this.authTokenKey, token);
  }

  removeAuthToken() {
    this.localStorage.removeItem(this.authTokenKey);
  }
}
