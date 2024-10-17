import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CustomFormsModule } from '../../../../shared/modules/custom-forms.module';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { SocialAuthService, GoogleSigninButtonModule, GoogleLoginProvider, GoogleInitOptions } from '@abacritt/angularx-social-login';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from '../../../../core/services/local-storage.service';
import { NewCustomer } from '../../../../core/auth/models/new-customer.model';
import { AuthService } from '../../../../core/auth/services/auth.service';
import { UserRole } from '../../../../core/models/user.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, CustomFormsModule, LoginFormComponent, GoogleSigninButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent implements OnInit {

  googleLoginOptions: GoogleInitOptions = {
    oneTapEnabled: false, // default is true
    scopes: 'https://www.googleapis.com/auth/calendar.readonly'
  }; 

  private accessToken = '';

  private newCustomer: NewCustomer = {
    user: {
      email: '',
      role: undefined,
      googleApiToken: undefined
    },
    customer: {
      name: ''
    }
  }

  constructor(private authService: AuthService, private socialAuthService: SocialAuthService, private router: Router, private httpClient: HttpClient, private localStorage: LocalStorageService) { }

  ngOnInit(): void {
    this.socialAuthService.authState.subscribe((user) => {
      console.log(user)
      this.newCustomer.user.email = user.email;
      this.newCustomer.user.role = UserRole.CUSTOMER;
      this.newCustomer.user.googleApiToken = user.authToken;
      this.newCustomer.customer.name = user.name;
      this.register();
      this.localStorage.setItem("username", user.name);
    });
  }

  register() {
    this.authService.createUserCustomer(this.newCustomer).subscribe({
      next: () => {
        this.router.navigate(['/home']);
      }
    });
  }
}

