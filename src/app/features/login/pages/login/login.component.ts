import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CustomFormsModule } from '../../../../shared/modules/custom-forms.module';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { EventService } from '../../../../core/services/event.service';
import { Event } from '../../../../core/models/event.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, CustomFormsModule, LoginFormComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  
}

