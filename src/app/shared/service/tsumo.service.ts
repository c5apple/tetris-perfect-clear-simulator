import { Injectable } from '@angular/core';
import { Mino } from './mino';
import { AnswerType } from './answer-type.enum';

/**
 * ツモサービス
 */
@Injectable({
  providedIn: 'root'
})
export class TsumoService {

  /** 現在の開幕テンプレ */
  currentTemplate: number;

  /** 現在のツモ */
  currentTumo: Mino[];

  constructor() { }

  /**
   * 開幕テンプレを取得する
   */
  public getTemplateNo(): number {
    this.currentTemplate = 2; // TODO ランダム
    return this.currentTemplate;
  }

  /**
   * 新しいツモを取得する
   */
  public getTsumo(): Mino[] {
    this.shuffle();

    return this.currentTumo;
  }

  /**
   * ツモをランダムに入れ替える
   */
  private shuffle() {
    const noList = Mino.getNoList();

    // シャッフル
    let n = noList.length, t, i;
    while (n) {
      i = Math.floor(Math.random() * n--);
      t = noList[n];
      noList[n] = noList[i];
      noList[i] = t;
    }
    // セット
    this.currentTumo = [];
    noList.forEach(n => {
      this.currentTumo.push(new Mino(n));
    });

    // 4個まで
    this.currentTumo = this.currentTumo.slice(0, 4);
  }

  /**
   * パフェがあるかを取得する
   */
  public getAnswer(): AnswerType {
    return AnswerType.EXISTS;
  }
}
