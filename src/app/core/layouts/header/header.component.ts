import { Component } from '@angular/core';
import { SwitchThemeComponent } from '../../../shared/components/switch-theme/switch-theme.component';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { SharedModule } from '../../../shared/modules/shared.module';
import { BadgeModule } from 'primeng/badge';
import { UserProfile } from '../../models/user.model';
import { AuthService } from '../../auth/services/auth.service';
import { Router } from '@angular/router';
import { NotificationsComponent } from '../../../shared/components/notifications/notifications.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [SharedModule, BadgeModule, OverlayPanelModule, SwitchThemeComponent, AvatarModule, AvatarGroupModule, NotificationsComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  userProfile: UserProfile;

  constructor(private authService: AuthService, public router: Router) {
    this.userProfile = this.authService.userProfile;
  }

  openUserProfile() {
   this.router.navigateByUrl("user-profile");
  }
}
