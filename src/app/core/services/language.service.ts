import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private defaultLanguage = 'en-US';
  private currentLanguageCode: string = '';
  private supportedLanguages = [
    { code: 'pt-BR', name: 'Português (BR)' },
    { code: 'en-US', name: 'English (US)' }
  ];

  constructor(private translateService: TranslateService, private localStorageService: LocalStorageService) {
    this.translateService.addLangs(this.supportedLanguages.map(lang => lang.code));
    this.setInitialLanguage();
  }

  private setInitialLanguage(): void {
    const storedLanguage = this.getStoredLanguage();

    this.currentLanguageCode = storedLanguage || this.defaultLanguage;
    this.setLanguage(this.currentLanguageCode);
  }

  setLanguage(languageCode: string): void {
    this.currentLanguageCode = languageCode;
    this.translateService.use(languageCode);
    this.storeLanguage(languageCode);
  }

  getLanguage(): string {
    return this.currentLanguageCode;
  }

  getSupportedLanguages() {
    return this.supportedLanguages;
  }

  getTranslations(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.translateService.getTranslation(this.currentLanguageCode).subscribe(
        {
          next: (translations) => {
            resolve(translations);
          },
          error: (error) => reject(error)
        }
      );
    });
  }

  private getStoredLanguage(): string | null {
    return this.localStorageService.getItem('language');
  }

  private storeLanguage(language: string): void {
    this.localStorageService.setItem('language', language);
  }
}