import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { CustomFormsModule } from '../../../../shared/modules/custom-forms.module';
import { EventFormService } from '../../services/event-form.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FormComponent } from '../form/form.component';

@Component({
  selector: 'app-form-step-tickets',
  standalone: true,
  imports: [CardModule, CustomFormsModule, InputSwitchModule],
  templateUrl: './form-step-tickets.component.html',
  styleUrl: './form-step-tickets.component.scss'
})
export class FormStepTicketsComponent implements OnInit {
  ticketForm: FormGroup;
  showPriceInfo: boolean = true;

  constructor(
    public eventFormService: EventFormService,
    private parentComponent: FormComponent,
    private fb: FormBuilder
  ) {
    this.ticketForm = this.fb.group({
      freeEntry: new FormControl<boolean>(false),
      ticketUnitPrice: new FormControl(0),
      ticketTax: new FormControl(0)
    });

    this.ticketForm.get('freeEntry')?.valueChanges.subscribe(checked => {
      this.toggleRequiredFields(checked);
    });
  }

  ngOnInit() {
    this.toggleRequiredFields(false);
    let event = this.eventFormService.getEvent();

    if (event) {
      this.ticketForm.patchValue(event);
    } else {
      this.parentComponent.stepTo('information');
    }
  }

  toggleRequiredFields(checked: boolean) {
    if (!checked) {
      this.ticketForm.get('ticketUnitPrice')?.setValidators([Validators.required, Validators.min(0.01)]);
      this.showPriceInfo = true;
    } else {
      this.ticketForm.get('ticketUnitPrice')?.clearValidators();
      this.showPriceInfo = false;
    }

    this.ticketForm.get('ticketUnitPrice')?.updateValueAndValidity();
  }

  nextPage() {
    this.ticketForm.markAllAsTouched();
    this.ticketForm.updateValueAndValidity();

    if (this.ticketForm.valid) {
      this.eventFormService.event.freeEntry = !!this.ticketForm.get('freeEntry')?.value;
      this.eventFormService.event.ticketUnitPrice = this.ticketForm.get('ticketUnitPrice')?.value;
      this.eventFormService.event.ticketTax = this.ticketForm.get('ticketTax')?.value;

      this.parentComponent.stepTo('confirmation');
    }
  }

  prevPage() {
    this.parentComponent.stepTo('address');
  }
}