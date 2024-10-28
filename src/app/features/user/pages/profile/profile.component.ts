import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { AddressFormComponent } from '../../../../shared/components/address-form/address-form.component';
import { UserProfile, UserRole } from '../../../../core/models/user.model';
import { Company } from '../../../../core/models/company.model';
import { Customer } from '../../../../core/models/customer.model';
import { AuthService } from '../../../../core/auth/services/auth.service';
import { UserService } from '../../services/user.service';
import { CardModule } from 'primeng/card';
import { FileSelectEvent, FileUploadEvent, FileUploadModule } from 'primeng/fileupload';
import { CustomFormsModule } from '../../../../shared/modules/custom-forms.module';
import { Image } from '../../../../core/models/image.model';
import { ImageProcessorService } from '../../../../core/services/image-processor.service';

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
  userImage: Image | undefined;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private imageProcessorService: ImageProcessorService,
    private messageService: MessageService
  ) {
    this.addressForm = this.fb.group({});
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
          console.log(company);

          this.company = company;
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
          console.log(customer);
          this.addressForm.patchValue(customer.address!);
        },
        error: (e) => {
          console.log(e);
        }
      });
    }
  }

  onAddressFormReady(addressForm: FormGroup) {
    this.addressForm = addressForm;
  }

  onUploadImage(event: FileSelectEvent) {
    this.userImage = this.imageProcessorService.createImagesFromFiles(event.currentFiles)[0];
    this.userProfile.image = this.userImage;
  }

  choose(event: any, callback: any) {
    callback();
  }

  deletePhoto() {
    this.userImage = undefined;
    this.userProfile.image = undefined;
  }
}
