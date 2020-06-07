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
        break;
      case 2:
        this.shape = 'J';
        break;
      case 3:
        this.shape = 'L';
        break;
      case 4:
        this.shape = 'O';
        break;
      case 5:
        this.shape = 'S';
        break;
      case 6:
        this.shape = 'T';
        break;
      case 7:
        this.shape = 'Z';
        break;
    }
  }
}
