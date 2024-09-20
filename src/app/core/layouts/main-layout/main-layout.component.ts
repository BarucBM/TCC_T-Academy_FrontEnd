import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LanguageSelectorComponent } from '../../../shared/components/language-selector/language-selector.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class LayoutComponent {

}
