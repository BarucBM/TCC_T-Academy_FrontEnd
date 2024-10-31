import { Component, OnInit } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import { CalendarOptions, EventClickArg } from '@fullcalendar/core/index.js';
import listPlugin from '@fullcalendar/list';
import { CalendarService } from '../../../../core/services/calendar.service';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-user-calendar',
  standalone: true,
  imports: [FullCalendarModule],
  templateUrl: './user-calendar.component.html',
  styleUrls: ['./user-calendar.component.scss']
})
export class UserCalendarComponent implements OnInit {
  googleCalendarId: string = '';
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, listPlugin, interactionPlugin, googleCalendarPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,listYear'
    },
    initialView: 'dayGridMonth',
    displayEventTime: false,
    googleCalendarApiKey: environment.googleCalendarKey,
    events: { googleCalendarId: this.googleCalendarId },
    eventClick: this.handleEventClick.bind(this)
  };

  constructor(private calendarService: CalendarService) {}

  ngOnInit(): void {
    this.calendarService.getCalendarId().subscribe({
      next: (calendarId) => {
        this.googleCalendarId = calendarId;
        this.updateCalendarOptions();
        console.log(this.googleCalendarId);
      },
      error: (err) => {
        console.error('Failed to fetch calendar ID:', err);
      }
    });
  }

  updateCalendarOptions(): void {
    this.calendarOptions.events = { googleCalendarId: this.googleCalendarId };
  }

  handleEventClick(arg: EventClickArg): void {
    window.open(arg.event.url, '_blank', 'width=700,height=600');
    arg.jsEvent.preventDefault();
  }
}