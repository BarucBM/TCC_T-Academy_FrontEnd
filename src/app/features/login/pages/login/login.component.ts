import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router, RouterLink } from '@angular/router';
import { CustomFormsModule } from '../../../../shared/modules/custom-forms.module';
import { AuthService } from '../../../../core/auth/services/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { DividerModule } from 'primeng/divider';
import { GoogleAuthComponent } from '../../../../shared/components/google-auth/google-auth.component';

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

  handleLogin(): void {
    if (this.loginForm.valid) {
      // this.authService.login(this.loginForm.value).subscribe({
      //   next: (res: LoginResponse) => {
      //     this.authService.setAuthToken(res.token);
      //     this.router.navigateByUrl(this.route.snapshot.queryParamMap.get('stateUrl') || '');
      //   },
      //   error: () => {
      //     this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Unable to login, invalid credentials.' });
      //   }
      // })
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}

