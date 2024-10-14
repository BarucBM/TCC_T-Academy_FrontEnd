import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Event } from '../../../core/models/event.model';
import { Image } from '../../../core/models/image.model';

@Injectable({
  providedIn: 'root',
})
export class EventFormService {
  event!: Event;
  private formComplete = new Subject<any>();
  formComplete$ = this.formComplete.asObservable();

  constructor() { }

  getEvent(): Event | null {
    return this.event;
  }

  setEvent(event: Event) {
    this.event = event;
  }

  complete() {
    const formData = new FormData();

    formData.append('title', this.event.title);
    formData.append('description', this.event.description);
    formData.append('freeEntry', this.event.freeEntry.toString());
    formData.append('ticketUnitPrice', this.event.ticketUnitPrice?.toString());
    formData.append('ticketTax', this.event.ticketTax?.toString());
    formData.append('startTime', this.formatDateToCustomFormat(this.event.startTime!) as string);
    formData.append('endTime', this.formatDateToCustomFormat(this.event.endTime!) as string);

    if (this.event.images) {
      let images = this.event.images as Image[];

      for (let i = 0; i < images.length; i++) {
        formData.append('images', images[i].file);
      }
    }

    const address = this.event.address;
    if (address) {
      formData.append('address.fullAddress', address.fullAddress ?? '');
      formData.append('address.postalCode', address.postalCode);
      formData.append('address.streetName', address.streetName);
      formData.append('address.streetNumber', address.streetNumber);
      formData.append('address.addressComplement', address.addressComplement ?? '');
      formData.append('address.neighborhood', address.neighborhood ?? '');
      formData.append('address.city', address.city);
      formData.append('address.state', address.state);
      formData.append('address.country', address.country);
      formData.append('address.latitude', address.latitude);
      formData.append('address.longitude', address.longitude);
    }
    
    this.formComplete.next(formData);
  }

  formatDateToCustomFormat(date: Date): string {
    const isoString = date.toISOString();
    return isoString.slice(0, 19);
  }
}
