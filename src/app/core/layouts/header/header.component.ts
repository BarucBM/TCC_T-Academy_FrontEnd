import { Component, OnInit } from '@angular/core';
import { SwitchThemeComponent } from '../../../shared/components/switch-theme/switch-theme.component';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { SharedModule } from '../../../shared/modules/shared.module';
import { BadgeModule } from 'primeng/badge';
import { NotificationListComponent } from '../../../features/preferences/pages/notification-list/notification-list.component';
import { UserDropdownComponent } from '../../../shared/components/user-dropdown/user-dropdown.component';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [SharedModule, BadgeModule, OverlayPanelModule, SwitchThemeComponent, AvatarModule, AvatarGroupModule, UserDropdownComponent, NotificationListComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  name: string | null = ''

  constructor(private localStorage: LocalStorageService ) {
  }
  ngOnInit(): void {
    this.name = this.localStorage.getItem('username');
  }


}
