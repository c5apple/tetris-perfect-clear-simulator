import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdsenseModule } from 'ng2-adsense';

import { environment } from 'src/environments/environment.prod';
import { MyAdsenseComponent } from './my-adsense.component';

@NgModule({
  declarations: [MyAdsenseComponent],
  imports: [
    CommonModule,
    AdsenseModule.forRoot(environment.adsense),
  ],
  exports: [
    MyAdsenseComponent
  ]
})
export class MyAdsenseModule { }
