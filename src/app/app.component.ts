import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'tcc_t-academy';

  constructor(private translate: TranslateService) {
    this.translate.addLangs(['pt-BR', 'en-US']);
    this.translate.setDefaultLang('en-US');
    this.translate.use('en-US');
  }

  useLanguage(language: string): void {
    this.translate.use(language);
  }
}
