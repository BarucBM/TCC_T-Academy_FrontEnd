import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { CustomFormsModule } from '../../modules/custom-forms.module';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-address-form',
  standalone: true,
  imports: [CommonModule, CustomFormsModule, InputGroupModule, InputGroupAddonModule],
  templateUrl: './address-form.component.html',
  styleUrl: './address-form.component.scss'
})
export class AddressFormComponent implements OnInit {
  @ViewChild('inputField')
  inputField!: ElementRef;
  @Output() addressFormReady = new EventEmitter<FormGroup>();
  addressForm: FormGroup;
  autocomplete?: google.maps.places.Autocomplete;

  constructor(private fb: FormBuilder) {
    this.addressForm = this.fb.group({
      fullAddress: new FormControl('', [Validators.required]),
      postalCode: new FormControl('', [Validators.required]),
      streetName: new FormControl('', [Validators.required]),
      streetNumber: new FormControl(''),
      addressComplement: new FormControl(''),
      neighborhood: new FormControl(''),
      city: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
      latitude: new FormControl('', [Validators.required]),
      longitude: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    this.addressForm.disable();
    this.addressForm.get("fullAddress")?.enable();

    this.addressFormReady.emit(this.addressForm);
  }

  ngAfterViewInit(): void {
    this.loadGoogleMapsScript().then(() => {
      this.initAutocomplete();
    });
  }

  loadGoogleMapsScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (document.querySelector(`script[src*="maps.googleapis.com/maps/api/js"]`)) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${environment.googleMapsApiKey}&libraries=places`;
      script.async = true;
      script.defer = true;
      
      script.onload = () => resolve();
      script.onerror = (error) => reject(error);

      document.head.appendChild(script);
    });
  }


  initAutocomplete(): void {
    if (!google?.maps?.places) {
      console.error('Google Maps API places not available');
      return;
    }
    
    this.autocomplete = new google.maps.places.Autocomplete(
      this.inputField.nativeElement,
      {
        fields: ["address_components", "geometry", "formatted_address"],
        types: ["address"]
      }
    );

    this.autocomplete.addListener("place_changed", () => this.fillInAddress());
  }

  fillInAddress(): void {
    const place = this.autocomplete?.getPlace();    
    this.addressForm.get("fullAddress")?.setValue(place?.formatted_address);  
    
    this.addressForm.enable();

    for (const component of place?.address_components!) {
      const componentType = component.types[0];

      switch (componentType) {
        case "postal_code":
          this.addressForm.controls['postalCode'].setValue(component.long_name);
          this.addressForm.get('postalCode')?.disable();
          break;
        case "route":
          this.addressForm.controls['streetName'].setValue(component.long_name);
          this.addressForm.get('streetName')?.disable();
          break;
        case "street_number":
          this.addressForm.controls['streetNumber'].setValue(component.long_name);
          this.addressForm.get('streetNumber')?.disable();
          break;
        case "sublocality_level_1":
          this.addressForm.controls['neighborhood'].setValue(component.long_name);
          this.addressForm.get('neighborhood')?.disable();
          break;
        case "administrative_area_level_2":
          this.addressForm.controls['city'].setValue(component.long_name);
          this.addressForm.get('city')?.disable();
          break;
        case "administrative_area_level_1":
          this.addressForm.controls['state'].setValue(component.short_name);
          this.addressForm.get('state')?.disable();
          break;
        case "country":
          this.addressForm.controls['country'].setValue(component.long_name);
          this.addressForm.get('country')?.disable();
          break;
      }
    }

    this.addressForm.controls['latitude'].setValue(place?.geometry?.location?.lat());
    this.addressForm.controls['longitude'].setValue(place?.geometry?.location?.lng());
  }

  ngOnDestroy() {
    if (this.autocomplete) {
      google.maps.event.clearInstanceListeners(this.autocomplete);
    }
  }
}
