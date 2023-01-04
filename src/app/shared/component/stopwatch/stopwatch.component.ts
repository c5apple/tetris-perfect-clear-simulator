import {
  Component,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
} from "@angular/core";
import { Subscription } from "rxjs";

import { TimerService } from "shared/service/timer";

/**
 * ストップウォッチコンポーネント
 */
@Component({
  selector: "app-stopwatch",
  templateUrl: "./stopwatch.component.html",
  styleUrls: ["./stopwatch.component.scss"],
})
export class StopwatchComponent implements OnInit, OnDestroy {
  /** 現在の時間 */
  time = 0;
  @Output() timeChanges: EventEmitter<number> = new EventEmitter<number>();

  /** タイムリミット */
  limit = 0;

  /** タイマー */
  timer?: Subscription;

  /** 停止中か */
  isStoped: boolean = false;

  constructor(private timerService: TimerService) {}

  ngOnInit() {
    // 持ち時間設定
    this.limit = this.timerService.timeLimit;

    this.start();
  }

  ngOnDestroy(): void {
    this.stop();
  }

  /**
   * トータル時間表記
   */
  get timeStr(): string {
    return this.format(this.time);
  }

  /**
   * 時間フォーマット
   */
  private format(time: number) {
    const m = Math.floor((time / 60 / 100) % 60);
    const s = Math.floor((time / 100) % 60);
    const ms = Math.floor(time % 100);

    return (
      `0${m}`.slice(-2) + ":" + `0${s}`.slice(-2) + ":" + `0${ms}`.slice(-2)
    );
  }

  /**
   * タイマー開始
   */
  public start() {
    this.timer = this.timerService.getTimer().subscribe((time) => {
      // カウントアップ
      this.time++;
      this.timeChanges.emit(this.time);

      // 終了
      if (this.limit <= this.time) {
        this.stop();
      }
    });
  }

  /**
   * タイマー終了
   */
  public stop() {
    this.timer?.unsubscribe();
  }
}
