import { Component, Output, EventEmitter } from '@angular/core';
import { FloatLabelModule  } from 'primeng/floatlabel';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'filter-component',
  standalone: true,
  imports: [FloatLabelModule, FormsModule, InputTextModule, ButtonModule, ReactiveFormsModule, CalendarModule ],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent {


  formFilter = new FormGroup({
    title:new FormControl(''),
    location:new FormControl(''),
    description:new FormControl(''),
    firstDate :new FormControl(''),
    secondDate :new FormControl(''),
  })

  
  @Output() emitter = new EventEmitter()

  onSubmit(){
    console.log(this.formFilter.value)
    this.emitter.emit(this.formFilter.value)
  }
}
