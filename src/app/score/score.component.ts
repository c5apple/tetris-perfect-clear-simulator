import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScoreService } from 'shared/service/score';

/**
 * スコア画面
 */
@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss']
})
export class ScoreComponent implements OnInit {

  /** 言語 */
  lang: string;

  /** 直近の件数 */
  answerdLimit = 0;

  /** 正解率 */
  correctRate: string;

  /** 正解数 */
  correctCount: number;

  /** 誤答数 */
  wrongCount: number;

  /** 平均解答時間 */
  averageAnswerTime: string;

  /** 最速タイム 10回 */
  bestTime10: { needCorrectCount: number; time: number; wrongCount: number; };

  /** 最速タイム 20回 */
  bestTime20: { needCorrectCount: number; time: number; wrongCount: number; };

  /** 最速タイム 40回 */
  bestTime40: { needCorrectCount: number; time: number; wrongCount: number; };

  /** 得意なツモ */
  correctList: {}[] = [];

  /** 苦手なツモ */
  wrongList: {}[] = [];

  constructor(
    private route: ActivatedRoute,
    private scoreService: ScoreService
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: { lang: string }) => {
      // 言語設定
      this.lang = params.lang;

      // 各種スコアを取得
      this.answerdLimit = this.scoreService.ANSWERED_LIMIT;
      this.correctRate = (this.scoreService.getCorrectRate() * 100).toFixed(2);
      this.correctCount = this.scoreService.getCorrectCount();
      this.wrongCount = this.scoreService.getWrongCount();
      this.averageAnswerTime = this.format(this.scoreService.getAverageAnswerTime());

      this.correctList = this.scoreService.getMostCorrectList();
      this.wrongList = this.scoreService.getMostWrongList();

      this.bestTime10 = this.scoreService.getBestTime(10);
      this.bestTime20 = this.scoreService.getBestTime(20);
      this.bestTime40 = this.scoreService.getBestTime(40);
    });
  }

  /**
   * 時間フォーマット
   */
  public format(time: number) {
    const m = Math.floor(time / 60 / 100 % 60);
    const s = Math.floor(time / 100 % 60);
    const ms = Math.floor(time % 100);

    return `0${m}`.slice(-2) + ':' + `0${s}`.slice(-2) + ':' + `0${ms}`.slice(-2);
  }
}
