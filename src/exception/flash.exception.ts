import { HttpException, NotFoundException } from '@nestjs/common';
import { ResUtil } from '../utils/res.util';

export class FlashException extends Error {
  code: number;
  msg: string;
  param: Map<string, any>;

  constructor(msg: string, code?: number) {
    super(msg);
    this.code = code ? code : ResUtil.CODE_FAIL;
    this.msg = msg;
  }

  add(key: string, value: any): FlashException {
    this.param.set(key, value);
    return null;
  }

  getParamString(): string {
    return JSON.stringify(Array.from(this.param));
  }
}
