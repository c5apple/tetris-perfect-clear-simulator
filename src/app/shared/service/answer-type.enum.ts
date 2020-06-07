/**
 * 正誤判定
 */
export enum AnswerType {
  /** パフェあり */
  EXISTS = 1,
  /** パフェあり(ホールドなし) */
  EXISTS_NO_HOLD = 2,
  /** パフェなし */
  NONE = 3
}
