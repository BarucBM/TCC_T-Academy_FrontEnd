import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { CustomFormsModule } from '../../../../shared/modules/custom-forms.module';
import { EventFormService } from '../../services/event-form.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { FileUploaderComponent } from '../../../../shared/components/file-uploader/file-uploader.component';
import { FormComponent } from '../form/form.component';
import { Image } from '../../../../core/models/image.model';

@Component({
  selector: 'app-form-step-basic',
  standalone: true,
  imports: [CardModule, CustomFormsModule, InputTextareaModule, CalendarModule, FileUploaderComponent],
  templateUrl: './form-step-basic.component.html',
  styleUrl: './form-step-basic.component.scss',
  providers: [DatePipe]
})
export class FormStepBasicComponent implements OnInit {
  eventForm: FormGroup;
  selectedImages: Image[] = [];

  constructor(
    public eventFormService: EventFormService,
    private parentComponent: FormComponent,
    private fb: FormBuilder
  ) {
    this.eventForm = this.fb.group({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      startTime: new FormControl<Date | null>(null, [Validators.required]),
      endTime: new FormControl<Date | null>(null, [Validators.required]),
      images: new FormControl([])
    });
  }

  ngOnInit() {
    let event = this.eventFormService.getEvent();

    if (event) {
      this.eventForm.patchValue(event);

      if (event.images) {
        this.selectedImages = event.images as Image[];
        this.eventForm.get('images')?.setValue(this.selectedImages);
      }
    }
  }

  onSelectedFiles(images: Image[]) {
    this.eventForm.patchValue({ images });
  }

  nextPage() {
    this.eventForm.markAllAsTouched();
    this.eventForm.updateValueAndValidity();

    if (this.eventForm.valid) {
      this.eventFormService.event = { ...this.eventFormService.event, ...this.eventForm.value };
      this.parentComponent.stepTo('address');
    }
  }
}