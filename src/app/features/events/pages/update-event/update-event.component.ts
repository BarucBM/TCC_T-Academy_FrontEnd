import { Component } from '@angular/core';
import { FormComponent } from '../../components/form/form.component';
import { SharedModule } from '../../../../shared/modules/shared.module';

@Component({
  selector: 'app-update-event',
  standalone: true,
  imports: [SharedModule, FormComponent],
  templateUrl: './update-event.component.html',
  styleUrl: './update-event.component.scss'
})
export class UpdateEventComponent {

}
