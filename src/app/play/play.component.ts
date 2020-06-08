import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  answerMark1: number;
  /** 正誤判定2 */
  answerMark2: number;
  /** 正誤判定3 */
  answerMark3: number;

  /** 正誤メッセージ */
  answerMessage: string;

  /** パフェパターン */
  perfectMino: Mino[][] = [];
  /** テト譜 */
  tetofu: string[] = [];

  /**
   * デバッグか
   * (パスパラメータを渡すと指定したツモが引ける)
   */
  isDebug = false;

  constructor(
    private route: ActivatedRoute,
    private tsumoService: TsumoService
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: { tsumo: string }) => {
      // ツモを取得
      this.getTsumo(params.tsumo);

      this.isDebug = Boolean(params.tsumo);
    });
  }

  /**
   * ツモを取得する
   */
  getTsumo(tsumo?: string): void {
    // 初期化
    this.answerShowed = false;
    this.answerMark1 = undefined;
    this.answerMark2 = undefined;
    this.answerMark3 = undefined;
    this.answerMessage = 'パフェはある？';
    this.perfectMino = [];
    this.tetofu = [];

    // ツモを取得
    this.tsumo = this.tsumoService.getTsumo(tsumo);

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
        this.answerMark1 = 1;
        this.answerMessage = '正解!! パフェはあります';
      } else {
        // 不正解
        this.answerMark1 = 2;
        this.answerMark3 = 1;
        this.answerMessage = '残念!! パフェはありません';
      }
    } else {
      // 「ない」と解答
      if (answer.answer === AnswerType.NONE) {
        // 正解
        this.answerMark3 = 1;
        this.answerMessage = '正解!! パフェはありません';
      } else {
        // 不正解
        this.answerMark3 = 2;
        this.answerMark1 = 1;
        this.answerMessage = '残念!! パフェはあります';
      }
    }

    // 正解パターンを表示
    if (answer.answer === AnswerType.EXISTS) {
      answer.answers.forEach(minos => {
        this.perfectMino.push(minos.split('').map(shape => new Mino(shape)));
      });
      this.tetofu = answer.tetofu;
    }
  }
}
