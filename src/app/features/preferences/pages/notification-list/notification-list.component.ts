import { Component, Input, OnInit } from '@angular/core';
import { SharedModule } from '../../../../shared/modules/shared.module';
import { BadgeModule } from 'primeng/badge';
import { MessageService } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { Message } from 'primeng/api';
import { RippleModule } from 'primeng/ripple';
import { NotificationService } from '../../../../core/services/notification.service';
import { HttpHeaders } from '@angular/common/http';
import { CardModule } from 'primeng/card';
import { PreferenceserviceService } from '../../../../core/services/preferenceservice.service';
import { SendActive } from '../../../../core/models/preference.model';

type NotificationType = 'suggestions' | 'reminders' | 'weatherChanges';

@Component({
  selector: 'notification-list',
  standalone: true,
  imports: [SharedModule, BadgeModule, FormsModule, ButtonModule, MessagesModule, ToastModule, CommonModule, RippleModule, CardModule],
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss'],
  providers: [MessageService]
})
export class NotificationListComponent implements OnInit {
  notificationsEnabled: Map<string, Boolean> = new Map([
    ['WEATHER', true],
    ['SUGGESTIONS', true],
    ['REMINDERS', true]
  ]);

  preference: SendActive = {
    notificationType: null,
    isActive: null
  }

  notifications: any[] = []; 

  @Input() messages: Message[] = [];

  predefinedMessages: Record<NotificationType, string> = {
    suggestions: 'Você tem novas sugestões disponíveis!',
    reminders: 'Lembrete: Seu evento está se aproximando!',
    weatherChanges: 'Atenção: Mudanças no clima previstas para hoje!',
  };

  constructor(private messageService: MessageService, private preferenceService: PreferenceserviceService) {}

  ngOnInit() {
    this.loadNotifications();
  }

  loadNotifications() {
    if (typeof localStorage !== 'undefined') {
      const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
      this.notifications = notifications; 
    } else {
      console.warn('localStorage is not available.');
      this.notifications = []; 
    }
  }

  // toggleNotification(type: NotificationType) {
  //   this.notificationsEnabled[type] = !this.notificationsEnabled[type];

  //   const userId = 'userId1'; 
  //   const eventId = 'eventId1'; 
  //   const token = localStorage.getItem('token');
  //   const headers = new HttpHeaders({
  //     'Authorization': `Bearer ${token}`
  //   });

  //   this.notificationService.toggleNotification(userId, eventId, type, this.notificationsEnabled[type], headers).subscribe(
  //     response => {
  //       console.log(`Notificação ${type} atualizada: ${this.notificationsEnabled[type]}`);
  //     },
  //     error => {
  //       console.error(`Erro ao atualizar notificação ${type}`, error);
  //     }
  //   );
  // }

  clearMessages() {
    this.messages = [];
    this.messageService.clear();
    console.log(this.notificationsEnabled)
  }

  addMessage(type: NotificationType) {
    this.messages = [
      { severity: this.getSeverity(type), summary: this.predefinedMessages[type] }
    ];
  }

  onCheckboxChange(key: string, event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    this.notificationsEnabled.set(key, checkbox.checked);

    this.updatePreferences();
  }

  updatePreferences(){    
    for (const [key, value] of this.notificationsEnabled.entries()) {
      this.preference.isActive = value
      this.preference.notificationType = key
      this.preferenceService.updatePreference("b56d1ad8-46a6-4f6d-a8bb-aac67261ff5f", this.preference );      
    }
  }

  private getSeverity(type: NotificationType): string {
    switch (type) {
      case 'suggestions':
        return 'info';
      case 'reminders':
        return 'success';
      case 'weatherChanges':
        return 'warn';
      default:
        return 'info';
    }
  }
}
