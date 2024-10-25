import { Component, Input, OnInit } from '@angular/core';
import { SharedModule } from '../../shared/modules/shared.module';
import { BadgeModule } from 'primeng/badge';
import { MessageService } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { Message } from 'primeng/api';
import { RippleModule } from 'primeng/ripple';
import { NotificationService } from '../../core/services/notification.service';
import { HttpHeaders } from '@angular/common/http';
import { CardModule } from 'primeng/card';

type NotificationType = 'suggestions' | 'reminders' | 'weatherChanges';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [
    SharedModule,
    CardModule,
    BadgeModule,
    FormsModule,
    ButtonModule,
    MessagesModule,
    ToastModule,
    CommonModule,
    RippleModule
  ],
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  providers: [MessageService]
})
export class NotificationComponent implements OnInit {
  notificationsEnabled = {
    suggestions: true,
    reminders: true,
    weatherChanges: true,
  };

  private fallbackStorage: any = {}; 
  notifications: any[] = [];

  @Input() messages: Message[] = [];

  predefinedMessages: Record<NotificationType, string> = {
    suggestions: 'Você tem novas sugestões disponíveis!',
    reminders: 'Lembrete: Seu evento está se aproximando!',
    weatherChanges: 'Atenção: Mudanças no clima previstas para hoje!',
  };

  constructor(private messageService: MessageService, private notificationService: NotificationService) {}

  ngOnInit() {
    this.loadNotifications();
  }

  loadNotifications() {
    if (this.isLocalStorageAvailable()) {
      const savedSettings = JSON.parse(localStorage.getItem('notificationsEnabled') || '{}');
      this.notificationsEnabled = { ...this.notificationsEnabled, ...savedSettings };
      const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
      this.notifications = notifications;
    } else {
      console.warn('localStorage is not available, using fallback storage.');
      
      this.notificationsEnabled = { ...this.notificationsEnabled, ...this.fallbackStorage.notificationsEnabled };
    }
  }

  toggleNotification(type: NotificationType) {
    this.notificationsEnabled[type] = !this.notificationsEnabled[type];

    if (this.isLocalStorageAvailable()) {
      this.saveNotificationSettings();
    } else {
      this.fallbackStorage.notificationsEnabled = this.notificationsEnabled;
    }

    const userId = 'userId1'; // Exemplo de ID de usuário
    const eventId = 'eventId1'; // Exemplo de ID de evento
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.notificationService.toggleNotification(userId, eventId, type, this.notificationsEnabled[type], headers).subscribe(
      response => {
        console.log(`Notificação ${type} atualizada: ${this.notificationsEnabled[type]}`);
      },
      error => {
        console.error(`Erro ao atualizar notificação ${type}`, error);
      }
    );
  }

  saveNotificationSettings() {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem('notificationsEnabled', JSON.stringify(this.notificationsEnabled));
    } else {
      console.warn('localStorage não disponível, usando fallback storage.');
      this.fallbackStorage.notificationsEnabled = this.notificationsEnabled;
    }
  }

  isLocalStorageAvailable(): boolean {
    try {
      const testKey = '__test__';
      localStorage.setItem(testKey, 'test');
      localStorage.removeItem(testKey);
      return true;
    } catch (error) {
      return false;
    }
  }

  clearMessages() {
    this.messages = [];
    this.messageService.clear();
  }

  addMessage(type: NotificationType) {
    this.messages = [
      { severity: this.getSeverity(type), summary: this.predefinedMessages[type] }
    ];
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
