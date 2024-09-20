import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ThemeService } from '../../../core/services/theme.service';
import { SharedModule } from '../../modules/shared.module';
import { FormsModule } from '@angular/forms';
import { InputSwitchModule } from 'primeng/inputswitch';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-switch-theme',
  standalone: true,
  imports: [SharedModule, InputSwitchModule, FormsModule],
  templateUrl: './switch-theme.component.html'
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
    this.themeService.setTheme(this.checked ? 'dark' : 'light');
  }
}