import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SharedModule } from '../../../../shared/modules/shared.module';
import { TranslateService } from '@ngx-translate/core';
import { CompanyFormComponent } from '../../components/company-form/company-form.component';
import { CustomerFormComponent } from '../../components/customer-form/customer-form.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [SharedModule, RouterLink, FormsModule, SelectButtonModule, CustomerFormComponent, CompanyFormComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  accountOptions: any[] = [
    { label: 'register.accountType.customer', value: 'customer' },
    { label: 'register.accountType.company', value: 'company' }
  ];

  selectedAccountOption: string = 'customer';

  constructor(private translate: TranslateService) {
    this.accountOptions = this.accountOptions.map(option => ({
      label: this.translate.instant(option.label),
      value: option.value
    }));
  }
}
