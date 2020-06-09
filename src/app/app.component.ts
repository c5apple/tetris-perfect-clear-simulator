import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { SwUpdate } from '@angular/service-worker';
import { TranslateService } from '@ngx-translate/core';
import { filter, map, mergeMap } from 'rxjs/operators';
import { GaService } from './shared/service/ga';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private meta: Meta,
    private title: Title,
    private swUpdate: SwUpdate,
    private translate: TranslateService,
    private gaService: GaService
  ) {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        // 強制更新
        window.location.reload();
      });
      // Check for new version
      this.swUpdate.checkForUpdate();
    }
  }

  ngOnInit(): void {

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.route),
      map(route => {
        while (route.firstChild) route = route.firstChild;
        return route;
      }),
      filter(route => route.outlet === 'primary'),
      mergeMap(route => route.params)
    ).subscribe((params: { lang: string }) => {
      window.scrollTo(0, 0);

      // URLの言語チェック
      this.checkLang(params.lang);
    });

    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((params: any) => {
      if (params.url !== '/') {
        this.meta.addTag({ name: 'robots', content: 'noindex' });
      } else {
        this.meta.removeTag('name=robots');
      }

      // タイトル設定
      this.translate.get('タイトル').subscribe(appTitle => {
        const titles: Array<string> = this.getRouterData(this.router.routerState, this.router.routerState.root, 'title');
        const title = ((titles.length > 0) ? titles.pop() + ' - ' : '') + appTitle;
        this.title.setTitle(title);
      });

      // メタ設定
      this.translate.get('説明文').subscribe(appDescription => {
        this.meta.updateTag({ name: 'description', content: appDescription });
      });

      // tracking
      this.gaService.sendPageView(location.pathname);
    });
  }

  /** サポート言語 */
  private availableLangList = ['en', 'ja'];
  /** サポートHTML言語 */
  private availableHtmlLangList = ['en-US', 'ja-JP'];

  /**
   * 言語チェック
   */
  private checkLang(lang: string) {
    const langNo = this.availableLangList.indexOf(lang);
    if (langNo === -1) {
      // デフォルト英語
      return window.location.href = './en/';
    }
    // 言語設定
    this.translate.setDefaultLang(lang);
    this.translate.use(lang);
    document.documentElement.lang = this.availableHtmlLangList[langNo];
    document.getElementById('my-manifest').setAttribute('href', 'manifest_' + lang + '.webmanifest');
  }

  /**
   * Router設定値を取得する。
   * @param state 状態
   * @param parent 親
   */
  private getRouterData(state, parent, key: string): Array<string> {
    const data: Array<string> = [];
    if (parent && parent.snapshot.data && parent.snapshot.data[key]) {
      data.push(parent.snapshot.data[key]);
    }
    if (state && parent) {
      // 再帰
      data.push(... this.getRouterData(state, state.firstChild(parent), key));
    }
    return data;
  }
}
