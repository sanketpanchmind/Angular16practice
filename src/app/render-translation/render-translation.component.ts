import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-render-translation',
  templateUrl: './render-translation.component.html',
  styleUrls: ['./render-translation.component.scss']
})
export class RenderTranslationComponent {


  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }

  changeLanguage(lang: string) {
    this.translate.use(lang);
  }
}
