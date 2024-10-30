import { Component, OnInit } from '@angular/core';
import { WeatherCardComponent } from '../../../../shared/components/weather-card/weather-card.component';
import { UserCalendarComponent } from '../../../events/components/user-calendar/user-calendar.component';
import { AuthService } from '../../../../core/auth/services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [WeatherCardComponent, UserCalendarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent{  
  constructor(authService: AuthService) {
      authService.getAccessToken();
  }
}
