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
import { SuggestionsService } from '../../../core/services/suggestions.service'; 
import { HttpHeaders } from '@angular/common/http';
import { LocationService } from '../../../core/services/location.service';
import { Coordinates } from '../../../core/models/coordinates.model';
import { EventService } from '../../../features/events/services/event.service'; 

type NotificationType = 'suggestions' | 'reminders' | 'weatherChanges';

@Component({
  selector: 'app-notification-list',
  standalone: true,
  imports: [SharedModule, BadgeModule, FormsModule, ButtonModule, MessagesModule, ToastModule, CommonModule, RippleModule],
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
  suggestions: string = ''; 

  @Input() messages: Message[] = [];

  predefinedMessages: Record<NotificationType, string> = {
    suggestions: 'Você tem novas sugestões disponíveis!',
    reminders: 'Lembrete: Seu evento está se aproximando!',
    weatherChanges: 'Atenção: Mudanças no clima previstas para hoje!',
  };

  constructor(
    private messageService: MessageService, 
    private notificationService: NotificationService,
    private suggestionsService: SuggestionsService ,
    private locationService: LocationService
  ) {}

  ngOnInit() {
    this.loadNotifications();
    this.loadSuggestions(); 
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
  loadSuggestions() {
    this.locationService.getCurrentLocation().subscribe(
      (coordinates: Coordinates) => {
        const prompt = `Me dê sugestões de eventos próximos para a localização: lat ${coordinates.lat}, lon ${coordinates.lon}`; 
        
        this.suggestionsService.getSuggestions(prompt).subscribe(
          (data: any) => {
            if (data && data.candidates) {
              this.suggestions = data.candidates.map((candidate: any) => candidate.content.parts[0].text);
              this.addMessage('suggestions');
            } else {
              console.error('Nenhuma sugestão disponível');
            }
          },
          (error) => {
            console.error('Erro ao carregar sugestões', error);
          }
        );
      },
      (error) => {
        console.error('Erro ao obter localização do usuário', error);
      }
    );
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
    const messageText = type === 'suggestions' ? this.suggestions : this.predefinedMessages[type]; 
    this.messages = [
      { severity: this.getSeverity(type), summary: messageText }
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
