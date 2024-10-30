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
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url: string = "http://localhost:8080/auth";
  private authTokenKey: string = "auth-token";
  private refreshTokenKey: string = "refresh-token";
  private urlGoogleAuth: string = "https://accounts.google.com/o/oauth2/v2/auth";
  private redirectUri = 'http://localhost:4200/home';
  private scope = 'https://www.googleapis.com/auth/calendar';
  private includeGrantedScopes = 'true';
  private state = 'pass-through value';
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

  refreshToken(refreshToken: string): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(`${this.url}/refresh-token`, { refreshToken });
  }

  isLoggedIn(): boolean {
    return this.getAuthToken() != null;
  }

  getUserId(): string {
    let token = this.getAuthToken();
    return token ? jwtDecode<JwtPayload>(token).id : '';
  }

  getUserRole(): string {
    let token = this.getAuthToken();
    return token ? jwtDecode<JwtPayload>(token).role : '';
  }

  isTokenExpired(): boolean {
    let token = this.getAuthToken();

    if (token) {
      const currentTime = Math.floor(Date.now() / 1000);
      const expiration = jwtDecode<JwtPayload>(token).exp;

      return expiration ? expiration < currentTime : true;
    }

    return true;
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

  getRefreshToken(): string | null {
    return this.localStorage.getItem(this.refreshTokenKey);
  }

  setRefreshToken(token: string): void {
    this.localStorage.setItem(this.refreshTokenKey, token);
  }

  removeRefreshToken() {
    this.localStorage.removeItem(this.refreshTokenKey);
  }

  authenticate() {
    const authUrl = `${this.urlGoogleAuth}?scope=${this.scope}&include_granted_scopes=${this.includeGrantedScopes}&response_type=token&state=${this.state}&redirect_uri=${this.redirectUri}&client_id=${environment.googleLoginClientId}`;
    window.location.href = authUrl;
  }

  getAccessToken() {
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.substring(1));
    const accessToken = params.get('access_token');
    if (accessToken) {
        console.log('Access Token:', accessToken);
        localStorage.setItem('access_token', accessToken);
    } else {
        console.error('Access token not found in URL');
    }
  }
}
