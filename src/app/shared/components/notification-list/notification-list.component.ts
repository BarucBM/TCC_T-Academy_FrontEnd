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
import { Event as AppEvent } from '../../../core/models/event.model'; 


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
  lat: number | null = null;
  lon: number | null = null;

  notifications: any[] = []; 
  suggestions: string[] = []; 

  @Input() messages: Message[] = [];

  predefinedMessages: Record<NotificationType, string> = {
    suggestions: 'Você tem novas sugestões disponíveis!',
    reminders: 'Lembrete: Seu evento está se aproximando!',
    weatherChanges: 'Atenção: Mudanças no clima previstas para hoje!',
  };

  constructor(
    private messageService: MessageService, 
    private notificationService: NotificationService,
    private suggestionsService: SuggestionsService,
    private locationService: LocationService,
    private eventService: EventService
  ) {}

  ngOnInit() {
    this.loadNotifications();
    this.locationService.getCurrentLocation(); 

  }

  loadNotifications() {
    const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    this.notifications = notifications; 
  }

  

  loadSuggestions(lat: number | null, lon: number | null) {
    if (lat !== null && lon !== null) {
      // Chame o serviço para obter sugestões
      const prompt = `Quais são os eventos acontecendo perto de mim nos próximos dias? Estou localizado em ${lat}, ${lon}.`;
      this.suggestionsService.getSuggestions(prompt).subscribe(
        (data) => {
          console.log(data); // Processar dados recebidos
        },
        (error) => {
          console.error('Erro ao carregar sugestões', error);
        }
      );
    } else {
      console.warn('Localização não disponível.');
    }
  }


  addMessage(type: string) {
    const messageText = type === 'suggestions' ? this.suggestions.join(', ') : 'Outro tipo de mensagem.';
    const message = {
      severity: 'info',
      summary: messageText
    };
    this.messageService.add(message);
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



  private addMessageToMessages(message: Message) {
    this.messages.push(message);
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
