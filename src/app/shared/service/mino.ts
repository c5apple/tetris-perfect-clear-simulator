/**
 * ミノ
 */
export class Mino {

  /**
   * No
   * 1: i
   * 2: j
   * 3: l
   * 4: o
   * 5: s
   * 6: t
   * 7: z
   */
  no: number;

  /** 形 */
  shape: string;

  /** 画像URL */
  imgUrl: string;

  /** 一番目の画像URL */
  imgUrlNext: string;

  /** すべてのNoを取得する */
  public static getNoList(): number[] {
    return [1, 2, 3, 4, 5, 6, 7];
  }

  /**
   * コンストラクタ
   * @param no 
   */
  constructor(no: number) {
    this.no = no;

    switch (no) {
      case 1:
        this.shape = 'I';
        this.imgUrl = '/assets/img/mino/i.png';
        this.imgUrlNext = '/assets/img/mino/i-next.png';
        break;
      case 2:
        this.shape = 'J';
        this.imgUrl = '/assets/img/mino/j.png';
        this.imgUrlNext = '/assets/img/mino/j-next.png';
        break;
      case 3:
        this.shape = 'L';
        this.imgUrl = '/assets/img/mino/l.png';
        this.imgUrlNext = '/assets/img/mino/l-next.png';
        break;
      case 4:
        this.shape = 'O';
        this.imgUrl = '/assets/img/mino/o.png';
        this.imgUrlNext = '/assets/img/mino/o-next.png';
        break;
      case 5:
        this.shape = 'S';
        this.imgUrl = '/assets/img/mino/s.png';
        this.imgUrlNext = '/assets/img/mino/s-next.png';
        break;
      case 6:
        this.shape = 'T';
        this.imgUrl = '/assets/img/mino/t.png';
        this.imgUrlNext = '/assets/img/mino/t-next.png';
        break;
      case 7:
        this.shape = 'Z';
        this.imgUrl = '/assets/img/mino/z.png';
        this.imgUrlNext = '/assets/img/mino/z-next.png';
        break;
    }
  }
}
