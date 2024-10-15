import { Component, Input } from '@angular/core';
import { SharedModule } from '../../modules/shared.module';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-form-error',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './form-error.component.html',
  styleUrl: './form-error.component.scss'
})
export class FormErrorComponent {
  @Input() control?: AbstractControl;
}
