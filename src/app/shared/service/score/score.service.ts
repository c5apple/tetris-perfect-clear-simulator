import { Injectable } from '@angular/core';
import { AnswerType } from '../answer-type.enum';
import { Mino } from '../mino';

/**
 * スコアサービス
 */
@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  /** 解答記録 */
  private answeredList: {
    templateNo: number,
    tsumo: string,
    buttonId: AnswerType,
    answer: AnswerType,
    time: number
  }[] = [];

  /**
   * 最速記録
   */
  private bestTimeList: {
    needCorrectCount: number,
    time: number,
    wrongCount: number
  }[] = [];

  /** 何件まで記録するか */
  public ANSWERED_LIMIT = 1000;

  constructor() {
    this.answeredList = JSON.parse(localStorage.getItem('answeredList') || '[]');
    this.bestTimeList = JSON.parse(localStorage.getItem('bestTimeList') || '[]');
  }

  /**
  * 記録をリセットする
  */
  public reset(): void {
    localStorage.removeItem('answeredList');
    localStorage.removeItem('bestTimeList');
  }

  /**
   * 解答を記録する
   */
  public setCorrect(templateNo: number, tsumo: string, buttonId: AnswerType, answer: AnswerType, time: number): void {
    this.answeredList.push({
      templateNo: templateNo,
      tsumo: tsumo,
      buttonId: buttonId,
      answer: answer,
      time: time
    });

    // 直近の件数で絞る
    if (this.ANSWERED_LIMIT < this.answeredList.length) {
      this.answeredList = this.answeredList.slice(1, this.ANSWERED_LIMIT);
    }

    localStorage.setItem('answeredList', JSON.stringify(this.answeredList));
  }

  /**
   * 正解率を取得する
   */
  public getCorrectRate(): number {
    if (this.answeredList.length === 0) {
      return 0;
    }

    return this.getCorrectCount() / this.answeredList.length;
  }

  /**
   * 正解数を取得する
   */
  public getCorrectCount(): number {
    return this.answeredList.filter(answer => {
      return answer.buttonId === answer.answer;
    }).length;
  }

  /**
   * 誤答数を取得する
   */
  public getWrongCount(): number {
    return this.answeredList.filter(answer => {
      return answer.buttonId !== answer.answer;
    }).length;
  }

  /**
   * 平均解答時間を取得する
   */
  public getAverageAnswerTime(): number {
    if (this.answeredList.length === 0) {
      return 0;
    }

    return this.answeredList.map(answer => answer.time).reduce((prev, current) => {
      return prev + current;
    }) / this.answeredList.length;
  }

  /**
   * 正解したツモを解答時間が早い順に取得する
   */
  public getMostCorrectList(): {}[] {
    let correctMap: any = {};

    this.answeredList.filter(answer => {
      // 正解
      return answer.buttonId === answer.answer;
    }).forEach(answer => {
      const key = answer.templateNo + '-' + answer.tsumo;
      if (correctMap[key] === undefined) {
        correctMap[key] = {
          templateNo: answer.templateNo,
          tsumo: answer.tsumo,
          time: answer.time,
          count: 1
        };
      } else {
        // 再計算
        correctMap[key].time = (correctMap[key].time * correctMap[key].count + answer.time) / (correctMap[key].count + 1);
        correctMap[key].count++;
      }
    });

    correctMap = Object.values(correctMap).sort((a: any, b: any) => {
      // 解答時間が早い順
      if (a['time'] < b['time']) return -1;
      if (a['time'] > b['time']) return 1;
      // 正解数が多い順
      if (a['count'] > b['count']) return -1;
      if (a['count'] < b['count']) return 1;
      return 1;
    });

    return Object.values(correctMap).slice(0, 5).map((answer: any) => {
      let mino: Mino[] = [];
      (answer['tsumo'] as string).split('').forEach(shape => {
        mino.push(new Mino(shape));
      });
      answer['mino'] = mino;
      return answer;
    });
  }

  /**
   * 誤答したツモを解答時間が遅い順に取得する
   */
  public getMostWrongList(): {}[] {
    let correctMap: any = {};

    this.answeredList.filter(answer => {
      // 誤答
      return answer.buttonId !== answer.answer;
    }).forEach(answer => {
      const key = answer.templateNo + '-' + answer.tsumo;
      if (correctMap[key] === undefined) {
        correctMap[key] = {
          templateNo: answer.templateNo,
          tsumo: answer.tsumo,
          time: answer.time,
          count: 1
        };
      } else {
        // 再計算
        correctMap[key].time = (correctMap[key].time * correctMap[key].count + answer.time) / (correctMap[key].count + 1);
        correctMap[key].count++;
      }
    });

    correctMap = Object.values(correctMap).sort((a: any, b: any) => {
      // 解答時間が遅い順
      if (a['time'] > b['time']) return -1;
      if (a['time'] < b['time']) return 1;
      // 正解数が多い順
      if (a['count'] > b['count']) return -1;
      if (a['count'] < b['count']) return 1;
      return 1;
    });

    return Object.values(correctMap).slice(0, 5).map((answer: any) => {
      let mino: Mino[] = [];
      (answer['tsumo'] as string).split('').forEach(shape => {
        mino.push(new Mino(shape));
      });
      answer['mino'] = mino;
      return answer;
    });
  }

  /**
   * 最速記録を設定する
   */
  public setBestTime(needCorrectCount: number, time: number, wrongCount: number): void {
    let index = this.bestTimeList.findIndex(best => best.needCorrectCount === needCorrectCount);
    const best = {
      needCorrectCount: needCorrectCount,
      time: time,
      wrongCount: wrongCount
    };
    if (index === -1) {
      this.bestTimeList.push(best);
    } else if (time < this.bestTimeList[index].time) {
      this.bestTimeList[index] = best;
    }
    localStorage.setItem('bestTimeList', JSON.stringify(this.bestTimeList));
  }

  /**
   * 最速記録を取得する
   */
  public getBestTime(needCorrectCount: number): {
    needCorrectCount: number,
    time: number,
    wrongCount: number
  } {
    return this.bestTimeList.find(best => best.needCorrectCount === needCorrectCount) || {
      needCorrectCount: needCorrectCount,
      time: 0,
      wrongCount: 0
    };
  }
}
