import { Component, Input, OnInit } from '@angular/core';
import { SharedModule } from '../../modules/shared.module';
import { BadgeModule } from 'primeng/badge';
import { MessageService } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { Message } from 'primeng/api';
import { RippleModule } from 'primeng/ripple';
import { NotificationService } from '../../../core/services/notification.service';
import { HttpHeaders } from '@angular/common/http';
import { CardModule } from 'primeng/card';

type NotificationType = 'suggestions' | 'reminders' | 'weatherChanges';

@Component({
  selector: 'app-notification-list',
  standalone: true,
  imports: [SharedModule, BadgeModule, FormsModule, ButtonModule, MessagesModule, ToastModule, CommonModule, RippleModule, CardModule],
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss'],
  providers: [MessageService]
})
export class NotificationListComponent implements OnInit {
  notificationsEnabled = {
    suggestions: true,
    reminders: true,
    weatherChanges: true,
  };

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
    if (typeof localStorage !== 'undefined') {
      const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
      this.notifications = notifications; 
    } else {
      console.warn('localStorage is not available.');
      this.notifications = []; 
    }
  }

  toggleNotification(type: NotificationType) {
    this.notificationsEnabled[type] = !this.notificationsEnabled[type];

    const userId = 'userId1'; 
    const eventId = 'eventId1'; 
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
