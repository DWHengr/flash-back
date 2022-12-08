export class ResUtil {
  private static readonly MSG = 'msg';
  private static readonly CODE = 'code';
  private static readonly DATA = 'data';

  private static readonly CODE_SUCCESS = 0; //成功
  private static readonly CODE_FAIL = 1; //失败
  private;

  public static success<T>(data: T) {
    return {
      [this.MSG]: '操作成功',
      [this.CODE]: this.CODE_SUCCESS,
      [this.DATA]: data,
    };
  }

  public static fail<T>(data: T) {
    return {
      [this.MSG]: '操作失败',
      [this.CODE]: this.CODE_FAIL,
      [this.DATA]: data,
    };
  }
}
