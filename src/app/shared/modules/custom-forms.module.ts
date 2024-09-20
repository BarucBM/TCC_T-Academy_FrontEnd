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

@NgModule({
  declarations: [],
  imports: [
    SharedModule, 
    InputIconModule, 
    IconFieldModule, 
    InputTextModule, 
    InputMaskModule, 
    InputTextModule,
    FloatLabelModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule
  ],
  exports: [
    SharedModule, 
    InputIconModule, 
    IconFieldModule, 
    InputTextModule, 
    InputMaskModule, 
    InputTextModule,
    FloatLabelModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule
  ]
})
export class CustomFormsModule { }
