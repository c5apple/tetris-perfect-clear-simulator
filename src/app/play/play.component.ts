import { Component, OnInit } from '@angular/core';

/**
 * プレイ画面
 */
@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnInit {

  /** 答えたか */
  answerShowed = false;

  /** 正誤判定1 */
  anserMark1: number;
  /** 正誤判定2 */
  anserMark2: number;
  /** 正誤判定3 */
  anserMark3: number;

  constructor() { }

  ngOnInit() {
  }

  /**
   * 答えるボタン
   * @param buttonId 1:ある, 2:ある(ホールドなし), 3:ない
   */
  answer(buttonId: number): void {
    if (this.answerShowed) {
      return;
    }
    this.answerShowed = true;

    // 正誤判定
    // this.anserMark1 = 1;
    this.anserMark2 = 1;
    this.anserMark3 = 2;
  }
}
