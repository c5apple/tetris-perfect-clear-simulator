import { Injectable } from '@angular/core';
import { Observable, interval } from 'rxjs';

/**
 * タイマーサービス
 */
@Injectable({
  providedIn: 'root'
})
export class TimerService {

  /** 持ち時間 */
  private _timeLimit = 180;  // 3分

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
    // 1秒間隔で経過秒数を返す
    return interval(1000);
  }

  /**
   * 初期値に戻す
   */
  public reset(): void {
    localStorage.removeItem('timeLimit');
    this._timeLimit = 900;
  }
}
