import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { AddressFormComponent } from '../../../../shared/components/address-form/address-form.component';
import { UserProfile, UserRole } from '../../../../core/models/user.model';
import { Company } from '../../../../core/models/company.model';
import { Customer } from '../../../../core/models/customer.model';
import { AuthService } from '../../../../core/auth/services/auth.service';
import { UserService } from '../../services/user.service';
import { CardModule } from 'primeng/card';
import { FileSelectEvent, FileUploadModule } from 'primeng/fileupload';
import { CustomFormsModule } from '../../../../shared/modules/custom-forms.module';
import { Image } from '../../../../core/models/image.model';
import { ImageProcessorService } from '../../../../core/services/image-processor.service';
import { CompanyService } from '../../../../core/services/company.service';
import { CustomerService } from '../../../../core/services/customer.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CustomFormsModule, ButtonModule, CardModule, FileUploadModule, AddressFormComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  userProfile: UserProfile;
  company: Company | undefined;
  customer: Customer | undefined;
  addressForm: FormGroup;
  companyForm: FormGroup;
  customerForm: FormGroup;
  userImage: Image | undefined;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private companyService: CompanyService,
    private customerService: CustomerService,
    private imageProcessorService: ImageProcessorService,
    private messageService: MessageService
  ) {
    this.addressForm = this.fb.group({});
    this.companyForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      duns: new FormControl('', [Validators.required])
    });
    this.customerForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required])
    });

    this.userProfile = this.authService.userProfile;
    this.userImage = this.userProfile.image;
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    if (this.authService.getUserRole() == UserRole.COMPANY) {
      this.userService.getCompany().subscribe({
        next: (company) => {
          this.company = company;
          this.companyForm.patchValue(company);
          this.addressForm.patchValue(company.address!);
        },
        error: (e) => {
          console.log(e);
        }
      })
    } else {
      this.userService.getCustomer().subscribe({
        next: (customer) => {
          this.customer = customer;
          this.customerForm.patchValue(customer);
          this.addressForm.patchValue(customer.address!);
        },
        error: (e) => {
          console.log(e);
        }
      });
    }
  }

  saveCompany() {
    if (this.companyForm.valid && this.addressForm.valid) {
      const id = this.company?.id;
      this.company = this.companyForm.value;
      this.company!.id = id;
      this.company!.address = this.addressForm.getRawValue();

      this.companyService.updateCompany(id!, this.company!).subscribe({
        next: (res) => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User updated successfully!' });
        },
        error: (error) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Could not update your user, please try again later.' });
        }
      })
    } else {
      this.companyForm.markAllAsTouched();
      this.addressForm.markAllAsTouched();
    }
  }

  saveCustomer() {
    if (this.customerForm.valid && this.addressForm.valid) {
      const id = this.customer?.id!;
      this.customer = this.customerForm.value;
      this.customer!.id = id;
      this.customer!.address = this.addressForm.getRawValue();

      this.customerService.updateCustomer(id, this.customer!).subscribe({
        next: (res) => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User updated successfully!' });
        },
        error: (error) => {
          console.log(error);

          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Could not update your user, please try again later.' });
        }
      })
    } else {
      this.customerForm.markAllAsTouched();
      this.addressForm.markAllAsTouched();
    }
  }

  onAddressFormReady(addressForm: FormGroup) {
    this.addressForm = addressForm;
  }

  onUploadImage(event: FileSelectEvent) {
    this.userImage = this.imageProcessorService.createImagesFromFiles(event.currentFiles)[0];

    const formData = new FormData();
    formData.append('file', this.userImage.file);

    this.userService.uploadPhoto(this.authService.getUserId(), formData).subscribe({
      next: () => {
        this.userProfile.image = this.userImage;
      },
      error: () => { 
        this.userImage = undefined;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Could not upload your photo, please try again later.' });
      }
    })
  }

  choose(event: any, callback: any) {
    callback();
  }

  deletePhoto() {
    if (!this.userProfile.image) {
      return;
    }

    this.userService.removePhoto(this.authService.getUserId()).subscribe({
      next: () => {
        this.userImage = undefined;
        this.userProfile.image = undefined;
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Could not delete your photo, please try again later.' });
      }
    });
  }
}
