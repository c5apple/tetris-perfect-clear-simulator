import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';

import { TimerService } from 'shared/service/timer';

/**
 * タイマーコンポーネント
 */
@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit, OnDestroy {

  /** 残り時間 */
  time = 0;
  @Output() timeChanges: EventEmitter<number> = new EventEmitter<number>();

  /** タイムリミット */
  limit = 0;

  /** タイマー */
  timer: Subscription;

  /** 停止中か */
  isStoped: boolean;

  constructor(private timerService: TimerService) { }

  ngOnInit() {
    // 持ち時間設定
    this.time = this.timerService.timeLimit;

    this.start();
  }

  ngOnDestroy(): void {
    this.stop();
  }

  /**
   * 残り時間表記
   */
  get timeStr(): string {
    return this.format(this.time);
  }

  /**
   * 時間フォーマット
   */
  private format(time: number) {
    const h = Math.floor(time / 60 / 60);
    const m = Math.floor(time / 60 % 60);
    const s = Math.floor(time % 60);

    if (h >= 1) {
      return h + ':' + `0${m}`.slice(-2) + ':' + `0${s}`.slice(-2);
    } else if (m !== 0) {
      return '0:' + `0${m}`.slice(-2) + ':' + `0${s}`.slice(-2);
    } else {
      return '0:00:' + `0${s}`.slice(-2);
    }
  }

  /**
   * タイマー開始
   */
  public start() {
    this.timer = this.timerService.getTimer().subscribe(time => {
      // カウントダウン
      this.time--;
      this.timeChanges.emit(this.time);

      // 終了
      if (this.time === 0) {
        this.stop();
      }
    });
  }

  /**
   * タイマー終了
   */
  public stop() {
    this.timer.unsubscribe();
  }
}
