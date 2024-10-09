import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { EventService } from '../../../../core/services/event.service';
import { SharedModule } from '../../../../shared/modules/shared.module';
import { RouterOutlet } from '@angular/router';
import { StepsModule } from 'primeng/steps';
import { CardModule } from 'primeng/card';
import { EventFormService } from '../../services/event-form.service';
import { LanguageService } from '../../../../core/services/language.service';

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
  update: boolean = false;

  constructor(
    private eventFormService: EventFormService, 
    private eventService: EventService, 
    private messageService: MessageService,
    private languageService: LanguageService
  ) { }

  ngOnInit() {
    this.getSteps();

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
}
