import { NgModule } from '@angular/core';
import { SharedModule } from './shared.module';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DropdownModule } from 'primeng/dropdown';
import { FormErrorComponent } from '../components/form-error/form-error.component';
import { InputNumberModule } from 'primeng/inputnumber';

@NgModule({
  declarations: [],
  imports: [
    SharedModule, 
    InputIconModule, 
    IconFieldModule, 
    InputTextModule, 
    InputNumberModule,
    InputMaskModule,
    FloatLabelModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    FormErrorComponent
  ],
  exports: [
    SharedModule, 
    InputIconModule, 
    IconFieldModule, 
    InputMaskModule, 
    InputTextModule,
    InputNumberModule,
    FloatLabelModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    FormErrorComponent
  ]
})
export class CustomFormsModule { }
