import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TsumoService } from 'shared/service/tsumo';
import { Mino } from '../shared/service/mino';
import { AnswerType } from '../shared/service/answer-type.enum';
import { TimerService } from 'shared/service/timer';
import { ScoreService } from 'shared/service/score';

/**
 * プレイ画面
 */
@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnInit {

  /** 言語 */
  lang = '';

  /** モード名 */
  modeName: string;

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

  /** 解答時間 */
  time = 0;
  prevTime = 0;

  /** 正解数 */
  correctCount = 0;

  /** 不正解数 */
  wrongCount = 0;

  /** 必要正解数 */
  needCorrectCount = 0;

  /**
   * デバッグか
   * (パスパラメータを渡すと指定したツモが引ける)
   */
  isDebug = false;

  constructor(
    private route: ActivatedRoute,
    private tsumoService: TsumoService,
    private timerService: TimerService,
    private translate: TranslateService,
    private scoreService: ScoreService
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: { lang: string, tsumo: string }) => {
      // プレイモード設定
      if (location.pathname.indexOf('/play/10times') !== -1) {
        this.needCorrectCount = 10;
      } else if (location.pathname.indexOf('/play/20times') !== -1) {
        this.needCorrectCount = 20;
      } else if (location.pathname.indexOf('/play/40times') !== -1) {
        this.needCorrectCount = 40;
      }
      if (this.needCorrectCount) {
        this.translate.get('タイムアタックモード').subscribe(title => this.modeName = title);
      } else {
        this.translate.get('練習モード').subscribe(title => this.modeName = title);
      }

      // ツモを取得
      this.getTsumo(params.tsumo);
      // 言語設定
      this.lang = params.lang;

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
    this.translate.get('質問文').subscribe(answerMessage => {
      this.answerMessage = answerMessage;
    });
    this.perfectMino = [];
    this.tetofu = [];

    // ツモを取得
    this.tsumo = this.tsumoService.getTsumo(tsumo);

    // 開幕テンプレを取得
    this.templateNo = this.tsumoService.getTemplateNo();

    // タイマー開始
    this.timerService.start();
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

    // タイマー停止
    this.timerService.stop();

    if (buttonId === AnswerType.EXISTS) {
      // 「ある」と解答
      if (answer.answer === AnswerType.EXISTS) {
        // 正解
        this.correctCount++;
        this.answerMark1 = 1;
        this.translate.get('正解パフェあり').subscribe(answerMessage => {
          this.answerMessage = answerMessage;
        });
      } else {
        // 不正解
        this.wrongCount++;
        this.answerMark1 = 2;
        this.answerMark3 = 1;
        this.translate.get('誤答パフェなし').subscribe(answerMessage => {
          this.answerMessage = answerMessage;
        });
      }
    } else {
      // 「ない」と解答
      if (answer.answer === AnswerType.NONE) {
        // 正解
        this.correctCount++;
        this.answerMark3 = 1;
        this.translate.get('正解パフェなし').subscribe(answerMessage => {
          this.answerMessage = answerMessage;
        });
      } else {
        // 不正解
        this.wrongCount++;
        this.answerMark3 = 2;
        this.answerMark1 = 1;
        this.translate.get('誤答パフェあり').subscribe(answerMessage => {
          this.answerMessage = answerMessage;
        });
      }
    }

    // 正解パターンを表示
    if (answer.answer === AnswerType.EXISTS) {
      answer.answers.forEach(minos => {
        this.perfectMino.push(minos.split('').map(shape => new Mino(shape)));
      });
      this.tetofu = answer.tetofu;
    }

    // 解答を記録
    if (this.needCorrectCount) {
      this.scoreService.setCorrect(this.templateNo, tsumo, buttonId, answer.answer, this.time - this.prevTime);

      if (this.needCorrectCount <= this.correctCount) {
        this.scoreService.setBestTime(this.needCorrectCount, this.time, this.wrongCount);
      }
    }

    // 前回の時間を記録
    this.prevTime = this.time;
  }

  /**
   * もう一度ボタン
   */
  retry() {
    location.reload();
  }
}
