import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { CustomFormsModule } from '../../../../shared/modules/custom-forms.module';
import { EventFormService } from '../../services/event-form.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { FileUploaderComponent } from '../../../../shared/components/file-uploader/file-uploader.component';
import { ImageProcessorService } from '../../../../core/services/image-processor.service';

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

  constructor(
    public eventFormService: EventFormService,
    private imageProcessorService: ImageProcessorService,
    private fb: FormBuilder,
    private router: Router
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
    }
  }

  onSelectedFiles(files: File[]) {   
    const images = this.imageProcessorService.createImages(files);

    this.eventForm.patchValue({ images });
  }

  nextPage() {
    this.eventForm.markAllAsTouched(); 
    this.eventForm.updateValueAndValidity();

    if (this.eventForm.valid) {
      this.eventFormService.event = this.eventForm.value;
      this.router.navigate(['create-event/address']);
    }
  }
}