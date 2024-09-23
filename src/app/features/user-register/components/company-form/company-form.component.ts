import { Component } from '@angular/core';
import { CustomFormsModule } from '../../../../shared/modules/custom-forms.module';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/auth/services/auth.service';
import { Router } from '@angular/router';
import { UserRole } from '../../../../core/models/user.model';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-company-form',
  standalone: true,
  imports: [CustomFormsModule, PasswordModule, DividerModule],
  templateUrl: './company-form.component.html',
  styleUrl: './company-form.component.scss'
})
export class CompanyFormComponent {
  companyForm: FormGroup;
  showPasswordError: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private messageService: MessageService) {
    this.companyForm = this.fb.group({
      user: this.fb.group({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(8)]),
        confirmPassword: new FormControl('', [Validators.required]),
        role: new FormControl(UserRole.COMPANY)
      }),
      company: this.fb.group({
        name: new FormControl('', [Validators.required]),
        address: new FormControl('', [Validators.required]),
        phone: new FormControl('', [Validators.required]),
        duns: new FormControl('', [Validators.required])
      })
    });
  }

  handleSubmit(): void {
    this.checkPasswordMatch();
    if (this.companyForm.valid && this.checkPasswordMatch()) {
      this.authService.createUserCompany(this.companyForm.value).subscribe({
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
}
