import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { SharedModule } from '../../../../shared/modules/shared.module';
import { EventFormService } from '../../services/event-form.service';
import { Router } from '@angular/router';
import { Event } from '../../../../core/models/event.model';
import { FieldsetModule } from 'primeng/fieldset';
import { GalleriaModule } from 'primeng/galleria';

@Component({
  selector: 'app-form-step-confirmation',
  standalone: true,
  imports: [SharedModule, CardModule, ButtonModule, FieldsetModule, GalleriaModule],
  templateUrl: './form-step-confirmation.component.html',
  styleUrl: './form-step-confirmation.component.scss'
})
export class FormStepConfirmationComponent implements OnInit {
  event!: Event;
  responsiveImageOptions: any[] | undefined;

  constructor(public eventFormService: EventFormService, private router: Router) { }

  ngOnInit() {
    this.event = this.eventFormService.event;

    if (!this.event) {
      this.router.navigateByUrl('create-event')
    }

    this.responsiveImageOptions = [
      {
        breakpoint: '1024px',
        numVisible: 5
      },
      {
        breakpoint: '768px',
        numVisible: 3
      },
      {
        breakpoint: '560px',
        numVisible: 1
      }
    ];
  }

  complete() {
    this.eventFormService.complete();
  }

  prevPage() {
    this.router.navigate(['create-event/tickets']);
  }
}