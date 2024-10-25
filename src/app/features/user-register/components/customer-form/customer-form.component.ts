import { Component } from '@angular/core';
import { CustomFormsModule } from '../../../../shared/modules/custom-forms.module';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/auth/services/auth.service';
import { MessageService } from 'primeng/api';
import { UserRole } from '../../../../core/models/user.model';
import { SocialUser } from '@abacritt/angularx-social-login';
import { AddressFormComponent } from '../../../../shared/components/address-form/address-form.component';
import { NewCustomer } from '../../../../core/models/customer.model';
import { GoogleAuthComponent } from '../../../../shared/components/google-auth/google-auth.component';

@Component({
  selector: 'app-customer-form',
  standalone: true,
  imports: [CustomFormsModule, AddressFormComponent, GoogleAuthComponent],
  templateUrl: './customer-form.component.html',
  styleUrl: './customer-form.component.scss',
})
export class CustomerFormComponent {
  customerData: NewCustomer = {
    customer: {
      name: '',
      phone: ''
    },
    user: {
      email: '',
      password: ''
    }
  };
  addressForm: FormGroup;
  showUserError: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private messageService: MessageService) {
    this.addressForm = this.fb.group({});
  }

  handleSubmit(): void {
    if (this.customerData.user.hasGoogleAuth && this.addressForm.valid) {
      this.customerData.customer.address = this.addressForm.getRawValue();

      this.authService.createUserCustomer(this.customerData).subscribe({
        next: (res) => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User created successfully!' });
          this.router.navigate(["/login"]);
        },
        error: (error) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Could not create your user, please try again later.' });
        }
      })
    } else {
      this.addressForm.markAllAsTouched();
      this.showUserError = !this.customerData.user.hasGoogleAuth;
    }
  }

  getUserData(userData: SocialUser) {
    this.customerData.user.email = userData.email;
    this.customerData.user.hasGoogleAuth = true;
    this.customerData.user.role = UserRole.CUSTOMER;
    this.customerData.customer.name = userData.name;

    this.showUserError = false;
  }

  onAddressFormReady(addressForm: FormGroup) {
    this.addressForm = addressForm;
  }
}
