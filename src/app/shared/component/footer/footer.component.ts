import { Component, OnInit } from '@angular/core';
import { TranslateService, DefaultLangChangeEvent } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  /** 言語 */
  lang = '';

  /** タイトル */
  title = '';

  constructor(
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.lang = this.translate.getDefaultLang();
    this.translate.onDefaultLangChange.subscribe((event: DefaultLangChangeEvent) => {
      this.lang = event.lang;
      this.title = event.translations['タイトル'];
    });
  }

}
