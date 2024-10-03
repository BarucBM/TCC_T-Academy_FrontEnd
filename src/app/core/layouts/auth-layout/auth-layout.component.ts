import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LanguageSelectorComponent } from '../../../shared/components/language-selector/language-selector.component';
import { SwitchThemeComponent } from '../../../shared/components/switch-theme/switch-theme.component';
import { SharedModule } from '../../../shared/modules/shared.module';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [SharedModule, RouterOutlet, LanguageSelectorComponent, SwitchThemeComponent],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.scss'
})
export class AuthLayoutComponent {

}