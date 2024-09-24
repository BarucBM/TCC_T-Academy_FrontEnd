import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SharedModule } from '../../../../shared/modules/shared.module';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { CompanyFormComponent } from '../../components/company-form/company-form.component';
import { CustomerFormComponent } from '../../components/customer-form/customer-form.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [SharedModule, RouterLink, FormsModule, SelectButtonModule, CustomerFormComponent, CompanyFormComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  selectedAccountOption: string = 'customer';
  accountOptions: any[] = [
    { label: 'Personal', value: 'customer' },
    { label: 'Corporate', value: 'company' }
  ];

  constructor(private translateService: TranslateService) { }

  ngOnInit(): void {
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.translateOptions(event.lang);
    });
  }

  translateOptions(language: string) {
    this.translateService.getTranslation(language).subscribe(translations => {     
      this.accountOptions = [
        { label: translations.register.accountType.customer, value: 'customer' },
        { label: translations.register.accountType.company, value: 'company' }
      ];
    });
  }
}
