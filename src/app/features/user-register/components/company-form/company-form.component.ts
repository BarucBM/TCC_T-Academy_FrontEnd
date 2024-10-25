import { Component } from '@angular/core';
import { CustomFormsModule } from '../../../../shared/modules/custom-forms.module';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/auth/services/auth.service';
import { Router } from '@angular/router';
import { UserRole } from '../../../../core/models/user.model';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { AddressFormComponent } from '../../../../shared/components/address-form/address-form.component';
import { NewCompany } from '../../../../core/models/company.model';

@Component({
  selector: 'app-company-form',
  standalone: true,
  imports: [CustomFormsModule, PasswordModule, DividerModule, AddressFormComponent],
  templateUrl: './company-form.component.html',
  styleUrl: './company-form.component.scss'
})
export class CompanyFormComponent {
  companyData: NewCompany = {
    company: {
      name: '',
      phone: '',
      duns: ''
    },
    user: {
      email: ''
    }
  };
  companyForm: FormGroup;
  addressForm: FormGroup;
  showPasswordError: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private messageService: MessageService) {
    this.addressForm = this.fb.group({});

    this.companyForm = this.fb.group({
      user: this.fb.group({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(8)]),
        confirmPassword: new FormControl('', [Validators.required]),
        role: new FormControl(UserRole.COMPANY)
      }),
      company: this.fb.group({
        name: new FormControl('', [Validators.required]),
        phone: new FormControl('', [Validators.required]),
        duns: new FormControl('', [Validators.required])
      })
    });
  }

  handleSubmit(): void {
    if (this.checkPasswordMatch() && this.companyForm.valid && this.addressForm.valid) {
      this.companyData = this.companyForm.value;
      this.companyData.company.address = this.addressForm.getRawValue();
      
      this.authService.createUserCompany(this.companyData).subscribe({
        next: (res) => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User created successfully!' });
          this.router.navigate(["/login"]);
        },
        error: (error) => {          
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Could not create your user, please try again later.' });
        }
      })
    } else {
      this.companyForm.markAllAsTouched();
      this.addressForm.markAllAsTouched();
    }
  }

  checkPasswordMatch(): boolean {
    let userData = this.companyForm.value['user'];

    if (userData.password === userData.confirmPassword) {
      this.showPasswordError = false;
      return true;
    }

    this.showPasswordError = true;
    return false;
  }

  onAddressFormReady(addressForm: FormGroup) {
    this.addressForm = addressForm;
  }
}
