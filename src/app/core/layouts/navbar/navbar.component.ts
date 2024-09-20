import { Component } from '@angular/core';
import { LanguageSelectorComponent } from '../../../shared/components/language-selector/language-selector.component';
import { SwitchThemeComponent } from '../../../shared/components/switch-theme/switch-theme.component';
import { SharedModule } from '../../../shared/modules/shared.module';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [SharedModule, LanguageSelectorComponent, SwitchThemeComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

}
