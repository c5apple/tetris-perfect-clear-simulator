import { Component, OnInit } from '@angular/core';
import { TsumoService } from '../shared/service/tsumo.service';
import { Mino } from '../shared/service/mino';
import { AnswerType } from '../shared/service/answer-type.enum';

/**
 * プレイ画面
 */
@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnInit {

  /** 開幕テンプレ */
  templateNo: number;

  /** ツモ */
  tsumo: Mino[];

  /** 答えたか */
  answerShowed = false;

  /** 正誤判定1 */
  anserMark1: number;
  /** 正誤判定2 */
  anserMark2: number;
  /** 正誤判定3 */
  anserMark3: number;

  constructor(
    private tsumoService: TsumoService
  ) { }

  ngOnInit() {
    // ツモを取得
    this.getTsumo();
  }

  /**
   * ツモを取得する
   */
  getTsumo(): void {
    // 初期化
    this.answerShowed = false;
    this.anserMark1 = undefined;
    this.anserMark2 = undefined;
    this.anserMark3 = undefined;

    // ツモを取得
    this.tsumo = this.tsumoService.getTsumo();
    console.log(this.tsumo);

    // 開幕テンプレを取得
    this.templateNo = this.tsumoService.getTemplateNo();
  }

  /**
   * 答えるボタン
   * @param buttonId 1:ある, 2:ある(ホールドなし), 3:ない
   */
  answer(buttonId: AnswerType): void {
    if (this.answerShowed) {
      return;
    }
    this.answerShowed = true;

    // 正誤判定
    const tsumo = this.tsumo.map(mino => mino.shape).join('');
    const answer = this.tsumoService.getAnswer(tsumo);

    if (buttonId === AnswerType.EXISTS) {
      // 「ある」と解答
      if (answer.answer === AnswerType.EXISTS) {
        // 正解
        this.anserMark1 = 1;
      } else {
        // 不正解
        this.anserMark1 = 2;
        this.anserMark3 = 1;
      }
    } else {
      // 「ない」と解答
      if (answer.answer === AnswerType.NONE) {
        // 正解
        this.anserMark3 = 1;
      } else {
        // 不正解
        this.anserMark3 = 2;
        this.anserMark1 = 1;
      }
    }
  }
}
