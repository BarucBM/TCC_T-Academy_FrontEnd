import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../modules/shared.module';
import { BadgeModule } from 'primeng/badge';
import { MessagesModule } from 'primeng/messages';
import { Message } from 'primeng/api';
import { LanguageService } from '../../../core/services/language.service';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [SharedModule, BadgeModule, MessagesModule],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss'
})
export class NotificationsComponent implements OnInit {
  messages: Message[] | undefined;

  constructor(private languageService: LanguageService) {}

  async ngOnInit() {
    const translations = await this.languageService.getTranslations();

    this.messages = [
      { icon: 'pi pi-exclamation-circle', severity: 'info', detail: translations.notifications.examples.info },
      { icon: 'pi pi-check', severity: 'success', detail: translations.notifications.examples.success },
      { icon: 'pi pi-check', severity: 'success', detail: translations.notifications.examples.success2 },
      { icon: 'pi pi-exclamation-triangle', severity: 'warn', detail: translations.notifications.examples.warning },
    ];
  }
}
