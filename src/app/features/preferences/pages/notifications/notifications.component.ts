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
import { InputSwitchModule } from 'primeng/inputswitch';
import { CheckboxModule } from 'primeng/checkbox';
import { AuthService } from '../../../../core/auth/services/auth.service';
import { LanguageService } from '../../../../core/services/language.service';

type NotificationType = 'suggestions' | 'reminders' | 'weatherChanges';

@Component({
  selector: 'notifications',
  standalone: true,
  imports: [SharedModule, BadgeModule, FormsModule, ButtonModule, MessagesModule, ToastModule, CommonModule, RippleModule, CardModule, InputSwitchModule],
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  providers: [MessageService]
})
export class NotificationsComponent implements OnInit {
  typeWeather = true;
  typeSuggestions = true;
  typeReminders = true;

  preference: SendActive = {
    notificationType: null,
    isActive: null
  }

  notifications: any[] = []; 

  @Input() messages: Message[] = [];

  predefinedMessages = {
    suggestions: {
      title: "Sugestão:",
      description: "Descubra os melhores eventos acontecendo em Blumenau e nas proximidades. Não perca as festividades, shows e feiras que estão agitando a região!"
    },
    reminders: {
      title: "Lembrete:",
      description: "O evento Oktoberfest Blumenau está se aproximando e promete ser incrível! Prepare-se para aproveitar."
    },
    weatherChanges: {
      title: "Atenção!",
      description: "O serviço meteorológico emitiu um alerta para condições climáticas adversas nas próximas horas. Esperam-se: tempestades, chuvas intensas e interrupções no transporte."
    }
  }

  constructor(private messageService: MessageService, private preferenceService: PreferenceserviceService, private authService: AuthService, private languageService: LanguageService) {}

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
  }

  async addMessage(type: NotificationType) {
    const translations = await this.languageService.getTranslations();

    this.messages = [
      { severity: this.getSeverity(type), summary: translations.notifications.examples[type].title, detail: translations.notifications.examples[type].description }
    ];
  }

  updatePreferences() {
    const weatherPreference = {
      notificationType: 'weatherChanges',
      isActive: this.typeWeather
    };

    const suggestionsPreference = {
      notificationType: 'suggestions',
      isActive: this.typeSuggestions
    };

    const remindersPreference = {
      notificationType: 'reminders',
      isActive: this.typeReminders
    };

    const userId = this.authService.getUserId();
    this.preferenceService.updatePreference(userId, weatherPreference );      
    this.preferenceService.updatePreference(userId, suggestionsPreference );      
    this.preferenceService.updatePreference(userId, remindersPreference );      

    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Preferences updated!' });
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
