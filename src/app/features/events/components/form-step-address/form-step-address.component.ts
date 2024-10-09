import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { CustomFormsModule } from '../../../../shared/modules/custom-forms.module';
import { EventFormService } from '../../services/event-form.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AddressFormComponent } from "../../../../shared/components/address-form/address-form.component";
import { Address } from '../../../../core/models/address.model';

@Component({
  selector: 'app-form-step-address',
  standalone: true,
  imports: [CardModule, CustomFormsModule, AddressFormComponent],
  templateUrl: './form-step-address.component.html',
  styleUrl: './form-step-address.component.scss'
})
export class FormStepAddressComponent {
  addressForm: any;

  constructor(
    public eventFormService: EventFormService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.addressForm = this.fb.group({});
  }

  onAddressFormReady(addressForm: FormGroup) {
    this.addressForm = addressForm;

    let event = this.eventFormService.getEvent();

    if (event) {     
      this.addressForm.patchValue(event.address);
    }
  }

  nextPage() {
    this.addressForm.markAllAsTouched(); 
    this.addressForm.updateValueAndValidity();

    if (this.addressForm.valid) {
      this.eventFormService.event.address = this.addressForm.getRawValue();
      this.router.navigate(['create-event/tickets']);
    }
  }

  prevPage() {
      this.router.navigate(['create-event/information']);
  }
}
