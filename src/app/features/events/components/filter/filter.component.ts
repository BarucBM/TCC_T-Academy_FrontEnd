import { Component, Output, EventEmitter } from '@angular/core';
import { FloatLabelModule  } from 'primeng/floatlabel';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';

import { SharedModule } from "../../../../shared/modules/shared.module";


@Component({
  selector: 'filter-component',
  standalone: true,
  imports: [FloatLabelModule, FormsModule, InputTextModule, ButtonModule, ReactiveFormsModule, CalendarModule, SharedModule ],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent {


  formFilter = new FormGroup({
    title:new FormControl(null),
    location:new FormControl(null),
    description:new FormControl(null),
    dates :new FormControl(null)
  })

  
  @Output() emitter = new EventEmitter()

  onSubmit(){
    this.emitter.emit(this.formFilter.value)
  }
}
