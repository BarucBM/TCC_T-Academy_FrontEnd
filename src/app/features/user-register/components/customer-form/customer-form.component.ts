import { Component } from '@angular/core';
import { CustomFormsModule } from '../../../../shared/modules/custom-forms.module';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/auth/services/auth.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-customer-form',
  standalone: true,
  imports: [CustomFormsModule, ToastModule],
  templateUrl: './customer-form.component.html',
  styleUrl: './customer-form.component.scss',
  providers: [MessageService]
})
export class CustomerFormComponent {
  customerForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private messageService: MessageService) {
    this.customerForm = this.fb.group({
      // TODO: implement registration with Google
      // user: this.fb.group({
      //   login: new FormControl('', [Validators.required]),
      //   password: new FormControl('', [Validators.required]),
      //   googleApiToken: new FormControl('', [Validators.required]),
      //   role: new FormControl(UserRole.CUSTOMER)
      // }),
      customer: this.fb.group({
        name: new FormControl('', [Validators.required]),
        address: new FormControl('', [Validators.required]),
        phone: new FormControl(''),
      })
    });
  }

  handleSubmit(): void {
    if (this.customerForm.valid) {
      this.authService.createUserCustomer(this.customerForm.value).subscribe({
        next: (res) => {
          this.showFeedbackMessage('success', 'Success', 'User created successfully!');
          this.router.navigate(["/login"]);
        },
        error: (error) => {
          this.showFeedbackMessage('error', 'Error', 'Could not create your user, please try again later.');
        }
      })
    } else {
      this.customerForm.markAllAsTouched();
    }
  }

  showFeedbackMessage(severity: string, title: string, message: string) {
    this.messageService.add({ severity: severity, summary: title, detail: message });
  }
}
