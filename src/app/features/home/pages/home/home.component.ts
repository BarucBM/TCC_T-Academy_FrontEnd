import { Component } from '@angular/core';
import { WeatherCardComponent } from '../../../../shared/components/weather-card/weather-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [WeatherCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
