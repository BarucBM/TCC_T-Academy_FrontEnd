import { Component } from '@angular/core';
import { SharedModule } from '../../../../shared/modules/shared.module';
import { FormComponent } from '../../components/form/form.component';

@Component({
  selector: 'app-create-event',
  standalone: true,
  imports: [SharedModule, FormComponent],
  templateUrl: './create-event.component.html',
  styleUrl: './create-event.component.scss'
})
export class CreateEventComponent {

}
