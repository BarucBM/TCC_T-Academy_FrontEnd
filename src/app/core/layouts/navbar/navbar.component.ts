import { Component } from '@angular/core';
import { LanguageSelectorComponent } from '../../../shared/components/language-selector/language-selector.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [LanguageSelectorComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

}
