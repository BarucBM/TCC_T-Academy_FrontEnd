import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../../core/services/theme.service';
import { SharedModule } from '../../modules/shared.module';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-switch-theme',
  standalone: true,
  imports: [SharedModule, FormsModule],
  templateUrl: './switch-theme.component.html',
  styleUrl: './switch-theme.component.scss'
})
export class SwitchThemeComponent implements OnInit {
  selectedTheme$: Observable<string>;
  checked!: boolean;

  constructor(private themeService: ThemeService) {
    this.selectedTheme$ = this.themeService.activeTheme$;
  }

  ngOnInit(): void {
    this.selectedTheme$.subscribe(theme => {
      this.checked = theme === 'dark';
    });
  }

  onThemeChange(): void {
    this.themeService.setTheme(this.checked ? 'light' : 'dark');
  }
}