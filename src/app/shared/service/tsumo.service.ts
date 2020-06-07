import { Injectable } from '@angular/core';
import { HttpResponse, HttpClient } from '@angular/common/http';
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

  /** 正誤判定1 */
  perfectPattern1: { "answer": number, "tsumo": string, "answers": [] }[];
  /** 正誤判定2 */
  perfectPattern2: { "answer": number, "tsumo": string, "answers": [] }[];

  constructor(
    public http: HttpClient
  ) {
    // 正誤判定初期化
    this.setPerfectPattern();
  }

  /**
   * 正誤判定を設定する
   */
  private setPerfectPattern(): void {
    // TODO クラス作成
    this.http.get<{ "answer": number, "tsumo": string, "answers": [] }[]>('/assets/json/perfect-pattern1.json').subscribe(data => {
      this.perfectPattern1 = data;
    });
    this.http.get<{ "answer": number, "tsumo": string, "answers": [] }[]>('/assets/json/perfect-pattern2.json').subscribe(data => {
      this.perfectPattern2 = data;
    });
  }

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
  public getAnswer(tsumo: string) {
    console.log(tsumo);
    const pattern = this.perfectPattern2.find(pattern => pattern.tsumo === tsumo);
    console.log(pattern);
    if (pattern === undefined) {
      throw new Error("Pattern Not Found!!");
    }
    return pattern;
  }
}
