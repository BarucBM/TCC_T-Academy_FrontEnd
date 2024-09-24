import { Component, Output, EventEmitter } from '@angular/core';
import { FloatLabelModule  } from 'primeng/floatlabel';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Event } from '../../../../core/models/event.model';

@Component({
  selector: 'filter-component',
  standalone: true,
  imports: [FloatLabelModule, FormsModule, InputTextModule, ButtonModule, ReactiveFormsModule ],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent {
  formFilter = new FormGroup({
    title:new FormControl(''),
    location:new FormControl(''),
    description:new FormControl(''),
  })

  
  @Output() emitter = new EventEmitter()

  onSubmit(){
    this.emitter.emit(this.formFilter.value)
  }
}
