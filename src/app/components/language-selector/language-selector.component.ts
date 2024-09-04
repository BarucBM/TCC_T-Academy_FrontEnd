import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-language-selector',
  standalone: true,
  imports: [CommonModule, FormsModule, DropdownModule, TranslateModule],
  templateUrl: './language-selector.component.html',
  styleUrl: './language-selector.component.scss'
})
export class LanguageSelectorComponent {
  languages: string[] = ['pt-BR', 'en-US'];
  selectedLanguage: string = 'en-US';

  constructor(private translate: TranslateService) {
    this.translate.addLangs(this.languages);

    let lang = 'en-US'
    if (typeof window !== 'undefined' && window.localStorage) {
      lang = localStorage.getItem('language') || 'en-US';
    }

    this.translate.setDefaultLang(lang);
    this.translate.use(lang);
  }

  changeLanguage(): void {
    this.translate.use(this.selectedLanguage);
    localStorage.setItem('language', this.selectedLanguage);
  }
}
