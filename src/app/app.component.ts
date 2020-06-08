import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Meta } from '@angular/platform-browser';
import { SwUpdate } from '@angular/service-worker';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private router: Router,
    private meta: Meta,
    private swUpdate: SwUpdate
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
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((params: any) => {
      window.scrollTo(0, 0);

      if (params.url !== '/') {
        this.meta.addTag({ name: 'robots', content: 'noindex' });
      } else {
        this.meta.removeTag('name=robots');
      }
    });
  }
}
