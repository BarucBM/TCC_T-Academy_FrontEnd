import { Component } from '@angular/core';
import { SwitchThemeComponent } from '../../../shared/components/switch-theme/switch-theme.component';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { SharedModule } from '../../../shared/modules/shared.module';
import { BadgeModule } from 'primeng/badge';
import { NotificationListComponent } from '../../../shared/components/notification-list/notification-list.component';
import { UserDropdownComponent } from '../../../shared/components/user-dropdown/user-dropdown.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [SharedModule, BadgeModule, OverlayPanelModule, SwitchThemeComponent, AvatarModule, AvatarGroupModule, UserDropdownComponent, NotificationListComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
