import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CustomFormsModule } from '../../../../shared/modules/custom-forms.module';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { Event } from '../../../../core/models/event.model';
import { EventService } from '../../../events/services/event.service';

declare var google: any;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, CustomFormsModule, LoginFormComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent implements OnInit{
  ngOnInit(): void {
    
  }
}

