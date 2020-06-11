import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Mino } from '../mino';
import { PerfectPattern } from '../perfect-pattern';
import { Tetofu } from '../tetofu';
import { AnswerType } from '../answer-type.enum';

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
  perfectPattern1: PerfectPattern[];
  /** 正誤判定2 */
  perfectPattern2: PerfectPattern[];

  /** テト譜1 */
  tetofu1: Tetofu[];
  /** テト譜2 */
  tetofu2: Tetofu[];

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
    this.http.get<PerfectPattern[]>('./assets/json/perfect-pattern1.json').subscribe(data => {
      this.perfectPattern1 = data;
    });
    this.http.get<PerfectPattern[]>('./assets/json/perfect-pattern2.json').subscribe(data => {
      this.perfectPattern2 = data;
    });
    this.http.get<Tetofu[]>('./assets/json/tetofu1.json').subscribe(data => {
      this.tetofu1 = data;
    });
    this.http.get<Tetofu[]>('./assets/json/tetofu2.json').subscribe(data => {
      this.tetofu2 = data;
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
   *
   * @param tsumo デバッグ用ツモ指定
   */
  public getTsumo(tsumo?: string): Mino[] {
    if (tsumo) {
      // ツモ指定
      this.currentTumo = [];
      tsumo.split('').forEach(shape => {
        this.currentTumo.push(new Mino(shape));
      });
    } else {
      // ランダム
      this.shuffle();
    }

    return this.currentTumo;
  }

  /**
   * ツモをランダムに入れ替える
   */
  private shuffle() {
    const noList = Mino.getAll();

    // シャッフル
    let n = noList.length;
    let t: string;
    let i: number;
    while (n) {
      i = Math.floor(Math.random() * n--);
      t = noList[n];
      noList[n] = noList[i];
      noList[i] = t;
    }
    // セット
    this.currentTumo = [];
    noList.forEach(shape => {
      this.currentTumo.push(new Mino(shape));
    });

    // 4個まで
    this.currentTumo = this.currentTumo.slice(0, 4);
  }

  /**
   * パフェがあるかを取得する
   */
  public getAnswer(tsumo: string): PerfectPattern {
    const pattern = this.perfectPattern2.find(p => p.tsumo === tsumo);
    if (pattern === undefined) {
      alert('りすくませんぱい「問題発生」');
      throw new Error('Pattern Not Found!!');
    }

    // テト譜結合
    pattern.tetofu = [];
    if (pattern.answer === AnswerType.EXISTS) {
      pattern.answers.forEach(minos => {
        const tetofu = this.tetofu2.find(p => p.tsumo === minos);
        if (tetofu) {
          pattern.tetofu.push(tetofu.tetofu);
        } else {
          // テト譜が存在しないバグあり
          alert('りすくませんぱい「問題発生」');
          console.error({ ...pattern });
          throw new Error('Tetofu Not Found!!');
        }
      });
    }

    return pattern;
  }
}
