import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CustomFormsModule } from '../../modules/custom-forms.module';
import { GoogleInitOptions, GoogleSigninButtonModule, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { LanguageService } from '../../../core/services/language.service';

@Component({
  selector: 'app-google-auth',
  standalone: true,
  imports: [RouterLink, CustomFormsModule, GoogleSigninButtonModule],
  templateUrl: './google-auth.component.html',
  styleUrl: './google-auth.component.scss'
})
export class GoogleAuthComponent {
  @Input() btnText: 'signin_with' | 'signup_with' | 'continue_with' = 'signin_with';
  @Output() userData = new EventEmitter<SocialUser>();
  currentLocation: string;

  googleLoginOptions: GoogleInitOptions = {
    oneTapEnabled: false, // default is true
    scopes: 'https://www.googleapis.com/auth/calendar.readonly'
  };

  constructor(private socialAuthService: SocialAuthService, private languageService: LanguageService) {
    this.currentLocation = this.languageService.getLanguage();
  }

  ngOnInit(): void {
    this.socialAuthService.authState.subscribe({
      next: (user: SocialUser) => {
        this.userData.emit(user);
      }
    });
  }
}
