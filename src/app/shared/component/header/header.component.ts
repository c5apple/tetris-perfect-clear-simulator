import { Component, OnInit } from '@angular/core';
import { TranslateService, DefaultLangChangeEvent } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  /** 言語 */
  lang = '';

  constructor(
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.translate.onDefaultLangChange.subscribe((event: DefaultLangChangeEvent) => {
      this.lang = event.lang;
    });
  }

}
