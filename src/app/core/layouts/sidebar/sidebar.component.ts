import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { SharedModule } from '../../../shared/modules/shared.module';
import { Router, RouterLinkActive, RouterModule } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { SwitchThemeComponent } from '../../../shared/components/switch-theme/switch-theme.component';
import { LanguageSelectorComponent } from '../../../shared/components/language-selector/language-selector.component';
import { AuthService } from '../../auth/services/auth.service';
import { HasPermissionDirective } from '../../directives/has-permission.directive';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    ButtonModule, 
    SharedModule, 
    RouterModule, 
    RouterLinkActive, 
    DialogModule, 
    SwitchThemeComponent, 
    LanguageSelectorComponent,
    HasPermissionDirective
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  settingsOpen: boolean = false;

  constructor(private router: Router, private authService: AuthService) { }

  handleLogout() {
    this.authService.logout().subscribe({
      next: () => {
        this.authService.removeAuthToken();
        this.authService.removeRefreshToken();
        
        window.location.reload();
      }
    });
  }

  openSettings() {
    this.settingsOpen = true;
  }
}
