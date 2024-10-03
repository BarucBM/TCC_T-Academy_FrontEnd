import { Component, Input } from '@angular/core';
import { Event } from '../../../../core/models/event.model';

@Component({
  selector: 'event-component',
  standalone: true,
  imports: [],
  templateUrl: './event.component.html',
  styleUrl: './event.component.scss'
})
export class EventComponent {
  @Input() event!:Event
}
