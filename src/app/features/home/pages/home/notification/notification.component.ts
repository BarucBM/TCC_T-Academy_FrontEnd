import { Component, Input } from '@angular/core';
import { BadgeModule } from 'primeng/badge';
import { MessageService } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';
import { Message } from 'primeng/api';
import { RippleModule } from 'primeng/ripple';




type NotificationType = 'suggestions' | 'reminders' | 'weatherChanges';

@Component({
    selector: 'app-notification',
    templateUrl: './notification.component.html',
    standalone: true,
    imports: [BadgeModule, FormsModule, ButtonModule, MessagesModule, ToastModule, CommonModule, RippleModule],
    providers: [MessageService]
})
export class NotificationComponent {
    notificationsEnabled = {
        suggestions: true,
        reminders: true,
        weatherChanges: true,
    };

    @Input() messages: Message[] = [];


    predefinedMessages = {
        suggestions: 'Você tem novas sugestões disponíveis!',
        reminders: 'Lembrete: Seu evento está se aproximando!',
        weatherChanges: 'Atenção: Mudanças no clima previstas para hoje!'
    };


    addMessage(type: string) {
        switch (type) {
            case 'suggestions':
                this.messages = [
                    { severity: 'info', summary: this.predefinedMessages.suggestions },
                    { severity: 'info', summary: this.predefinedMessages.suggestions },
                    { severity: 'info', summary: this.predefinedMessages.suggestions }
                ];
                break;
            case 'reminders':
                this.messages = [
                    { severity: 'success', summary: this.predefinedMessages.reminders },
                    { severity: 'success', summary: this.predefinedMessages.reminders },
                    { severity: 'success', summary: this.predefinedMessages.reminders }
                ];
                break;
            case 'weatherChanges':
                this.messages = [
                    { severity: 'warn', summary: this.predefinedMessages.weatherChanges },
                    { severity: 'warn', summary: this.predefinedMessages.weatherChanges },
                    { severity: 'warn', summary: this.predefinedMessages.weatherChanges }
                ];
                break;
            default:
                break;
        }
    }
    
   
    constructor(private messageService: MessageService) {}

    

    
    clearMessages() {
        this.messages = []; 
        this.messageService.clear();
    }

    toggleNotification(type: NotificationType) {
        this.notificationsEnabled[type] = !this.notificationsEnabled[type];
    }
}
