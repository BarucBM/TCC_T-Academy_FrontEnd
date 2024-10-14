import { Component } from '@angular/core';
import { SharedModule } from '../../../../shared/modules/shared.module';
import { RouterLink } from '@angular/router';
import { SwitchThemeComponent } from '../../../../shared/components/switch-theme/switch-theme.component';
import { LanguageSelectorComponent } from '../../../../shared/components/language-selector/language-selector.component';

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  imports: [SharedModule, RouterLink, SwitchThemeComponent, LanguageSelectorComponent],
  templateUrl: './unauthorized.component.html',
  styleUrl: './unauthorized.component.scss'
})
export class UnauthorizedComponent {

}
