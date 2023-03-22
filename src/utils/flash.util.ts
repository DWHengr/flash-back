export class FlashUtil {
  /**
   * Generation verification
   * @param num
   */
  public static genVerifyCode(num = 6): string {
    let randomNum = '';
    for (let i = 0; i < num; i++) {
      randomNum += Math.floor(Math.random() * 10);
    }
    return randomNum;
  }

  /**
   * Compare the difference in minutes
   * @param date1
   * @param date2
   * @returns
   */
  public static getMinutesDiff(date1: Date, date2: Date): number {
    const diffMs = Math.abs(date1.getTime() - date2.getTime());
    const diffMins = Math.floor(diffMs / 60000);
    return diffMins;
  }

  /**
   * Compare the difference in seconds
   * @param date1
   * @param date2
   * @returns
   */
  public static getSecondsDiff(date1: Date, date2: Date): number {
    const diffMs = Math.abs(date1.getTime() - date2.getTime());
    const difSecs = Math.floor(diffMs / 1000);
    return difSecs;
  }
}
