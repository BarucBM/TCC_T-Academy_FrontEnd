import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { EventService } from '../../../../core/services/event.service';
import { SharedModule } from '../../../../shared/modules/shared.module';
import { RouterOutlet } from '@angular/router';
import { StepsModule } from 'primeng/steps';
import { CardModule } from 'primeng/card';
import { EventFormService } from '../../services/event-form.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [SharedModule, RouterOutlet, StepsModule, CardModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent implements OnInit {
  items: MenuItem[] = [];
  subscription!: Subscription;
  update: boolean = false;

  constructor(private eventFormService: EventFormService, private eventService: EventService, private messageService: MessageService) { }

  ngOnInit() {
    this.items = [
      {
        label: 'Basic Info',
        routerLink: 'information'
      },
      {
        label: 'Address',
        routerLink: 'address'
      },
      {
        label: 'Tickets',
        routerLink: 'tickets'
      },
      {
        label: 'Confirmation',
        routerLink: 'confirmation'
      }
    ];

    this.subscription = this.eventFormService.formComplete$.subscribe((formData: FormData) => {
      if (this.update) {
        // update endpoint
      } else {
        this.eventService.createEvent(formData).subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Event created successfully!' });
          },
          error: (e) => console.error(e)
        });
      }
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
