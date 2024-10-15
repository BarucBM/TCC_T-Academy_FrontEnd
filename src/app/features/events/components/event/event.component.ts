import { Component, Input } from '@angular/core';
import { Event } from '../../../../core/models/event.model';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared/modules/shared.module';

@Component({
  selector: 'event-component',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './event.component.html',
  styleUrl: './event.component.scss'
})
export class EventComponent {
  @Input() event!:Event
}
