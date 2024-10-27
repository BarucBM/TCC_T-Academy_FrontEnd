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
import { AvatarModule } from 'primeng/avatar';
import { UserService } from '../../../user/services/user.service';

@Component({
  selector: 'app-customer-form',
  standalone: true,
  imports: [CustomFormsModule, AddressFormComponent, GoogleAuthComponent, AvatarModule],
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
  userGoogleData?: SocialUser;
  addressForm: FormGroup;
  showUserError: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private userService: UserService, private router: Router, private messageService: MessageService) {
    this.addressForm = this.fb.group({});
  }

  handleSubmit(): void {
    if (this.customerData.user.hasGoogleAuth && this.addressForm.valid) {
      this.customerData.customer.address = this.addressForm.getRawValue();

      this.authService.createUserCustomer(this.customerData).subscribe({
        next: (res) => {
          this.uploadUserPhoto(res.user?.id!);
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
    this.userGoogleData = userData;
    this.customerData.user.email = userData.email;
    this.customerData.user.hasGoogleAuth = true;
    this.customerData.user.role = UserRole.CUSTOMER;
    this.customerData.user.image = userData.photoUrl;
    this.customerData.customer.name = userData.name;

    this.showUserError = false;
  }

  onAddressFormReady(addressForm: FormGroup) {
    this.addressForm = addressForm;
  }

  async uploadUserPhoto(userId: string) {
    const response = await fetch(this.customerData.user.image);
    const blob = await response.blob();

    const file = new File([blob], "profile-image.jpg", { type: blob.type });

    const formData = new FormData();
    formData.append("file", file);
    this.userService.uploadPhoto(userId, formData).subscribe();
  }
}
