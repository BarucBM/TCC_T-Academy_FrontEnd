import { Component, Input, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { SharedModule } from '../../../../shared/modules/shared.module';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { StepsModule } from 'primeng/steps';
import { CardModule } from 'primeng/card';
import { EventFormService } from '../../services/event-form.service';
import { LanguageService } from '../../../../core/services/language.service';
import { EventService } from '../../services/event.service';
import { Event } from '../../../../core/models/event.model';
import { ImageProcessorService } from '../../../../core/services/image-processor.service';
import { ImageResponse } from '../../../../core/models/image.model';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [SharedModule, RouterOutlet, StepsModule, CardModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent implements OnInit {
  steps: MenuItem[] = [];
  subscription!: Subscription;
  @Input() action: 'update' | 'create' = 'create';
  event?: Event;

  constructor(
    private eventFormService: EventFormService, 
    private eventService: EventService, 
    private imageProcessorService: ImageProcessorService,
    private messageService: MessageService,
    private languageService: LanguageService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getSteps();
    this.getEvent();

    this.subscription = this.eventFormService.formComplete$.subscribe((formData: FormData) => {
      if (this.event) {
        this.eventService.updateEvent(this.event.id!, formData).subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Event updated successfully!' });
            this.router.navigateByUrl('events');
          },
          error: (e) => console.error(e)
        });
      } else {
        this.eventService.createEvent(formData).subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Event created successfully!' });
            this.router.navigateByUrl('events');
          },
          error: (e) => console.error(e)
        });
      }
    });
  }

  getEvent() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.eventService.getEventById(id).subscribe({
        next: (response: Event) => {
          this.eventFormService.setEvent(response);
          this.event = response;
          this.event.startTime = new Date(this.event.startTime!);
          this.event.endTime = new Date(this.event.endTime!);
          this.event.images = this.imageProcessorService.createImagesFromResponse(this.event.images as ImageResponse[]);
        },
        error: () => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Unable to load event, please try again later.' });
          this.router.navigateByUrl('/events');
        }
      });
    }
  }

  async getSteps() {
    let translations = await this.languageService.getTranslations();

    this.steps = [
      {
        label: translations.forms.event.steps.info.label,
        routerLink: 'information'
      },
      {
        label: translations.forms.event.steps.address.label,
        routerLink: 'address'
      },
      {
        label: translations.forms.event.steps.tickets.label,
        routerLink: 'tickets'
      },
      {
        label: translations.forms.event.steps.confirmation.label,
        routerLink: 'confirmation'
      }
    ];
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  stepTo(step: string) {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.router.navigate([`/events/${this.action}/${id}`, step]);
    } else {
      this.router.navigate([`/events/${this.action}`, step]);
    }
  }
}
