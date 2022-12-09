import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { ResUtil } from '../utils/res.util';
import { FlashException } from '../exception/flash.exception';
@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    let status;
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      response.status(status).json(ResUtil.failMsg('内部服务错误'));
    }
    if (exception instanceof FlashException) {
      response.json(ResUtil.failCodeAndMsg(exception.code, exception.msg));
    }
  }
}
