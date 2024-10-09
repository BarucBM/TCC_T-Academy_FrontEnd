import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { CustomFormsModule } from '../../../../shared/modules/custom-forms.module';
import { EventFormService } from '../../services/event-form.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { InputSwitchModule } from 'primeng/inputswitch';

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

  constructor(public eventFormService: EventFormService, private fb: FormBuilder, private router: Router) {
    this.ticketForm = this.fb.group({
      freeEntry: new FormControl<boolean>(false),
      ticketUnitPrice: new FormControl(''),
      ticketTax: new FormControl('')
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

        this.router.navigate(['create-event/confirmation']);
      }
  }

  prevPage() {
      this.router.navigate(['create-event/address']);
  }
}