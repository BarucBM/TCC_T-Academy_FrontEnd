import { Component } from '@angular/core';
import { NotificationComponent } from './notification/notification.component'; 
import { WeatherCardComponent } from '../../../../shared/components/weather-card/weather-card.component';
import { BadgeModule } from 'primeng/badge';
import { MessageService } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';
import { Message } from 'primeng/api';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [WeatherCardComponent, NotificationComponent, ToastModule, BadgeModule, FormsModule, MessagesModule, ButtonModule, CommonModule],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    providers: [MessageService] 
})
export class HomeComponent {}
