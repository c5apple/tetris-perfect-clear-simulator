import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService, DefaultLangChangeEvent } from '@ngx-translate/core';

/**
 * トップ画面
 */
@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.scss']
})
export class TopComponent implements OnInit {

  /** 言語 */
  lang = '';

  /** 説明文 */
  description = '';

  /** スタートボタン */
  start = '';

  constructor(
    private route: ActivatedRoute,
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: { lang: string }) => {
      this.lang = params.lang;

      if (this.translate.getDefaultLang()) {
        this.translate.get('説明文').subscribe(description => {
          this.description = description;
        });
        this.translate.get('スタート').subscribe(start => {
          this.start = start;
        });
      }
    });
  }

}
