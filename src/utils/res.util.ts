export class ResUtil {
  public static readonly MSG = 'msg';
  public static readonly CODE = 'code';
  public static readonly DATA = 'data';

  public static readonly CODE_SUCCESS = 0; //成功
  public static readonly CODE_FAIL = 1; //失败
  private;

  public static success<T>(data: T) {
    return {
      [this.MSG]: '操作成功',
      [this.CODE]: this.CODE_SUCCESS,
      [this.DATA]: data,
    };
  }

  public static fail() {
    return {
      [this.MSG]: '操作失败',
      [this.CODE]: this.CODE_FAIL,
    };
  }

  public static failCodeAndMsg(code: number, msg: string) {
    return {
      [this.MSG]: msg,
      [this.CODE]: code,
    };
  }

  public static failMsg(msg: string) {
    return {
      [this.MSG]: msg,
      [this.CODE]: this.CODE_FAIL,
    };
  }
}
