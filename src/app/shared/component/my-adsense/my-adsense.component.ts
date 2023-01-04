import { isDevMode, Component, OnInit } from '@angular/core';

/**
 * GoogleAdsenseコンポーネント
 */
@Component({
  selector: 'app-my-adsense',
  templateUrl: './my-adsense.component.html',
  styleUrls: ['./my-adsense.component.scss']
})
export class MyAdsenseComponent implements OnInit {

  public display: boolean = !isDevMode() && 'localhost' !== location.hostname;

  constructor() { }

  ngOnInit() {
  }

}
