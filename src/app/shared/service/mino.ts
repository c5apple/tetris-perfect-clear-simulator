/**
 * ミノ
 */
export class Mino {

  /** 形 */
  shape: string;

  /** 画像URL */
  imgUrl: string;

  /** 一番目の画像URL */
  imgUrlNext: string;

  /** すべてのミノを取得する */
  public static getAll(): string[] {
    return ['I', 'J', 'L', 'O', 'S', 'T', 'Z'];
  }

  /**
   * コンストラクタ
   * @param shape 形('I', 'J', 'L', 'O', 'S', 'T', 'Z')
   */
  constructor(shape: string) {
    this.shape = shape;
    this.imgUrl = './assets/img/mino/' + shape.toLowerCase() + '.png';
    this.imgUrlNext = './assets/img/mino/' + shape.toLowerCase() + '-next.png';
  }
}
