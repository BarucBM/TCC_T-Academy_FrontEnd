import { Component, OnInit } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { SharedModule } from '../../../../shared/modules/shared.module';
import { CustomerEvent } from '../../../../core/models/event.model';
import { EventService } from '../../services/event.service';
import { MessageService, SelectItem } from 'primeng/api';
import { EventComponent } from '../../components/event/event.component';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { TagModule } from 'primeng/tag';
import { DropdownChangeEvent, DropdownModule } from 'primeng/dropdown';
import { ImageResponse } from '../../../../core/models/image.model';
import { ImageProcessorService } from '../../../../core/services/image-processor.service';
import { LanguageService } from '../../../../core/services/language.service';
import { DatePipe } from '@angular/common';
import { RatingModule } from 'primeng/rating';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CustomerEventComponent } from '../../components/customer-event/customer-event.component';
import { AuthService } from '../../../../core/auth/services/auth.service';
import { UserCalendarComponent } from '../../components/user-calendar/user-calendar.component';

@Component({
  selector: 'app-customer-events',
  standalone: true,
  imports: [
    SharedModule,
    TabViewModule,
    EventComponent,
    CardModule,
    ButtonModule,
    DataViewModule,
    TagModule,
    DropdownModule,
    RatingModule,
    RouterLink,
    FormsModule,
    CustomerEventComponent,
    UserCalendarComponent
  ],
  templateUrl: './customer-events.component.html',
  styleUrl: './customer-events.component.scss',
  providers: [DatePipe]
})
export class CustomerEventsComponent implements OnInit {
  customerEvents: CustomerEvent[] = [];
  sortOptions!: SelectItem[];

  constructor(
    private eventService: EventService,
    private messageService: MessageService,
    private imageProcessorService: ImageProcessorService,
    private languageService: LanguageService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getCustomerEvents();
    this.getSortOptions();
  }

  async getSortOptions() {
    let translations = await this.languageService.getTranslations();

    this.sortOptions = [
      { label: translations.events.sortByDate.ascending, value: 0 },
      { label: translations.events.sortByDate.descending, value: 1 }
    ];
  }

  getCustomerEvents() {
    this.eventService.getAllCustomerEvents(this.authService.getUserId()).subscribe({
      next: (response) => {
        let events = response;

        events.forEach(event => {
          event.startTime = new Date(event.startTime!);
          event.endTime = new Date(event.endTime!);
          event.images = this.imageProcessorService.createImagesFromResponse(event.images as ImageResponse[]);
        });

        this.customerEvents = events;
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Unable to load your events, please try again later.' })
      },
    })
  }

  onSortChange(event: DropdownChangeEvent) {
    if (event.value === 0) {
      this.customerEvents = [...this.customerEvents].sort((a, b) => a.startTime!.getTime() - b.startTime!.getTime());
    } else {
      this.customerEvents = [...this.customerEvents].sort((a, b) => b.startTime!.getTime() - a.startTime!.getTime());
    }
  }

  deleteEvent(eventId: string) {
    this.customerEvents = this.customerEvents.filter(event => event.id !== eventId);
  }
}
