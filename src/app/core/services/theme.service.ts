import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private activeThemeSubject = new BehaviorSubject<string>('light');
  activeTheme$ = this.activeThemeSubject.asObservable();

  constructor(private localStorageService: LocalStorageService, @Inject(DOCUMENT) private document: Document) {
    const savedTheme = this.getSavedTheme();

    if (!savedTheme) {
      this.setTheme('light');
    } else {
      this.setTheme(savedTheme);
    }
  }

  setTheme(theme: string): void {
    this.applyThemeToDocument(theme);
    this.activeThemeSubject.next(theme);
    this.saveTheme(theme);
  }

  private applyThemeToDocument(theme: string): void {
    let themeLink = this.document.getElementById('app-theme') as HTMLLinkElement;
    
    if (themeLink) {
      themeLink.href = `theme-${theme}.css`;
      this.document.firstElementChild?.setAttribute('data-theme', theme);
    }
  }

  private getSavedTheme(): string | null {
    return this.localStorageService.getItem('app-theme');
  }

  private saveTheme(theme: string): void {
    this.localStorageService.setItem('app-theme', theme);
  }
}
