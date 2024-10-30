import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CustomFormsModule } from '../../../../shared/modules/custom-forms.module';
import { AuthService } from '../../../../core/auth/services/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { DividerModule } from 'primeng/divider';
import { GoogleAuthComponent } from '../../../../shared/components/google-auth/google-auth.component';
import { LoginResponse } from '../../../../core/auth/models/login.model';
import { SocialUser } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, CustomFormsModule, GoogleAuthComponent, InputGroupModule, InputGroupAddonModule, DividerModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private route: ActivatedRoute, private messageService: MessageService) {
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigateByUrl('/home');
    }
  }

  loginDefault(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (res: LoginResponse) => {
          this.authService.setAuthToken(res.token);
          this.authService.setRefreshToken(res.refreshToken);
          this.authService.init();
          this.router.navigateByUrl(this.route.snapshot.queryParamMap.get('stateUrl') || '');
          this.authService.authenticate();
        },
        error: () => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Unable to login, invalid credentials.' });
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  loginWithGoogle(userData: SocialUser) {
    this.authService.loginGoogle(userData.email).subscribe({
      next: (res: LoginResponse) => {
        this.authService.setAuthToken(res.token);
        this.authService.setRefreshToken(res.refreshToken);
        this.authService.init();
        this.router.navigateByUrl(this.route.snapshot.queryParamMap.get('stateUrl') || '');
        console.log('oi');
        this.authService.authenticate();

      },
      error: (e) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Unable to login, user not registered.' });
      }
    });
    
  }
}

