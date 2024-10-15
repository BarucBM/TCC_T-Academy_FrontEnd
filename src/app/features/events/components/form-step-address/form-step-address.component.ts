import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { CustomFormsModule } from '../../../../shared/modules/custom-forms.module';
import { EventFormService } from '../../services/event-form.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AddressFormComponent } from "../../../../shared/components/address-form/address-form.component";
import { FormComponent } from '../form/form.component';

@Component({
  selector: 'app-form-step-address',
  standalone: true,
  imports: [CardModule, CustomFormsModule, AddressFormComponent],
  templateUrl: './form-step-address.component.html',
  styleUrl: './form-step-address.component.scss'
})
export class FormStepAddressComponent implements OnInit {
  addressForm: any;

  constructor(
    public eventFormService: EventFormService,
    private parentComponent: FormComponent,
    private fb: FormBuilder
  ) {
    this.addressForm = this.fb.group({});
  }

  ngOnInit(): void {
    if (!this.eventFormService.getEvent()) {
      this.parentComponent.stepTo('information');
    }
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
      this.parentComponent.stepTo('tickets');
    }
  }

  prevPage() {
    this.parentComponent.stepTo('information');
  }
}
