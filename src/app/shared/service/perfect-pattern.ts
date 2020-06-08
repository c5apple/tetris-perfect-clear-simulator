import { AnswerType } from './answer-type.enum';

/**
 * パフェパターン
 */
export class PerfectPattern {

  /** パフェがあるか */
  answer: AnswerType;

  /** ツモ */
  tsumo: string;

  /** パフェパターン */
  answers: string[];

  /** テト譜 */
  tetofu?: string[];
}
