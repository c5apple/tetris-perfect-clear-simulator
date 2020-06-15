import { Injectable } from '@angular/core';
import { Observable, interval, BehaviorSubject, Subscription } from 'rxjs';

/**
 * タイマーサービス
 */
@Injectable({
  providedIn: 'root'
})
export class TimerService {

  /** 持ち時間 */
  private _timeLimit = 60 * 5 * 100;  // 5分

  /** タイマー */
  private timer: Subscription;

  /** タイマー変更検知 */
  private timerBehavior = new BehaviorSubject<number>(null);

  constructor() {
    // ローカルストレージから値を取得
    const timeLimit = Number(localStorage.getItem('timeLimit'));
    if (timeLimit > 0) {
      this._timeLimit = timeLimit;
    }
  }

  /**
   * 持ち時間を取得する
   */
  get timeLimit(): number {
    return this._timeLimit;
  }

  /**
   * 持ち時間を設定する
   */
  set timeLimit(num: number) {
    this._timeLimit = num;
    localStorage.setItem('timeLimit', this._timeLimit.toString());
  }

  public getTimer(): Observable<number> {
    return this.timerBehavior;
  }

  /**
   * タイマー開始
   */
  public start(): void {
    if (this.timer && !this.timer.closed) {
      this.timer.unsubscribe();
    }
    // 0.01秒間隔で経過秒数を返す
    this.timer = interval(10).subscribe(time => {
      this.timerBehavior.next(time);
    });
  }

  /**
   * タイマー停止
   */
  public stop() {
    this.timer.unsubscribe();
  }


  /**
   * 初期値に戻す
   */
  public reset(): void {
    localStorage.removeItem('timeLimit');
    this._timeLimit = 900;
  }
}
