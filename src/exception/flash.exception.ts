import { ResUtil } from '../utils/res.util';

export class FlashException extends Error {
  code: number;
  message: string;
  param: Map<string, any>;

  constructor(msg: string, code?: number) {
    super(msg);
    this.code = code ? code : ResUtil.CODE_FAIL;
    this.message = msg;
    this.param = new Map();
  }

  add(key: string, value: any): FlashException {
    this.param.set(key, value);
    return this;
  }

  getParamString(): string {
    if (this.param) {
      const ro: { [key: string]: any } = Object.fromEntries(this.param);
      return JSON.stringify(ro);
    }
    return 'null';
  }
}
