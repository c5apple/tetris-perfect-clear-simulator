import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopComponent } from './top/top.component';
import { PlayComponent } from './play/play.component';
import { ScoreComponent } from './score/score.component';
import { SettingComponent } from './setting/setting.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { MyAdsenseModule } from './shared/component/my-adsense/my-adsense.module';
import { HeaderComponent } from './shared/component/header/header.component';
import { TimerComponent } from './shared/component/timer/timer.component';
import { StopwatchComponent } from './shared/component/stopwatch/stopwatch.component';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    TopComponent,
    PlayComponent,
    ScoreComponent,
    SettingComponent,
    HeaderComponent,
    TimerComponent,
    StopwatchComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    MyAdsenseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
