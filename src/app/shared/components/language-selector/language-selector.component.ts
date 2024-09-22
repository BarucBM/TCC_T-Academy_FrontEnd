import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { SharedModule } from '../../modules/shared.module';
import { LanguageService } from '../../../core/services/language.service';

@Component({
  selector: 'app-language-selector',
  standalone: true,
  imports: [SharedModule, FormsModule, DropdownModule],
  templateUrl: './language-selector.component.html',
  styleUrl: './language-selector.component.scss'
})
export class LanguageSelectorComponent implements OnInit {
  @Input() showLabel: boolean = true;
  languages: { code: string, name: string }[] = [];
  selectedLanguage?: { code: string, name: string };

  constructor(private languageService: LanguageService) {}

  ngOnInit(): void {
    this.languages = this.languageService.getSupportedLanguages();
    this.selectedLanguage = this.languages.find(lang => lang.code === this.languageService.getLanguage());   
  }

  changeLanguage(languageCode: string): void {
    this.languageService.setLanguage(languageCode);
  }
}