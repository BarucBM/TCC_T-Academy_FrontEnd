import { Component, OnInit } from '@angular/core';
import { EventService } from '../../../../core/services/event.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomFormsModule } from '../../../../shared/modules/custom-forms.module';
import { MessageService } from 'primeng/api';
import { Event } from '../../../../core/models/event.model';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { DatePipe } from '@angular/common';
import { FileUploaderComponent } from '../../../../shared/components/file-uploader/file-uploader.component';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CustomFormsModule, CardModule, InputTextareaModule, CalendarModule, FileUploaderComponent],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
  providers: [DatePipe]
})
export class FormComponent implements OnInit {
  eventForm: FormGroup;
  eventData?: Event;
  files: any[] = [];
  totalSize: number = 0;
  totalSizePercent: number = 0;
  index = 0;

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private messageService: MessageService,
    private datePipe: DatePipe
  ) {
    this.eventForm = this.fb.group({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      location: new FormControl('', [Validators.required]),
      startTime: new FormControl<Date | null>(null, [Validators.required]),
      endTime: new FormControl<Date | null>(null, [Validators.required]),
      images: new FormControl([])
    });
  }

  ngOnInit(): void {
    if (this.eventData) {
      this.eventForm.patchValue(this.eventData);
    }
  }

  handleSubmit() {
    if (this.eventForm.valid) {
      const formData = this.prepareFormData();

      if (this.eventData) {
        // update event
      } else {
        this.eventService.createEvent(formData).subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Event created successfully!' });
          },
          error: (e) => console.log(e)
        });
      }
    } else {
      this.eventForm.markAllAsTouched();
    }
  }

  onSelectedFiles(files: File[]) {
    this.eventForm.patchValue({ images: files });
  }

  prepareFormData(): FormData {
    const formData = new FormData();

    formData.append('title', this.eventForm.value.title);
    formData.append('description', this.eventForm.value.description);
    formData.append('location', this.eventForm.value.location);

    const formattedStartTime = this.datePipe.transform(this.eventForm.value.startTime, 'yyyy-MM-dd\'T\'HH:mm:ss');
    const formattedEndTime = this.datePipe.transform(this.eventForm.value.endTime, 'yyyy-MM-dd\'T\'HH:mm:ss');

    formData.append('startTime', formattedStartTime as string);
    formData.append('endTime', formattedEndTime as string);

    for (let i = 0; i < this.eventForm.value.images.length; i++) {
      formData.append('images', this.eventForm.value.images[i]);
    }

    return formData;
  }
}
