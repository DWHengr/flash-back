import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { ResUtil } from '../utils/res.util';
import { FlashException } from '../exception/flash.exception';
import { LoggerService } from '../modules/logger/logger.service';

@Catch()
@Injectable()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(private readonly loggerService: LoggerService) {}

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    let log = '';
    if (exception instanceof FlashException) {
      log +=
        '自定义错误 -> ' +
        exception.constructor.name +
        '\n报错参数 -> ' +
        exception.getParamString();
      response.json(ResUtil.failCodeAndMsg(exception.code, exception.message));
    } else if (exception instanceof Error) {
      log += '未知错误 -> ' + exception.constructor.name;
      response.json(ResUtil.failMsg('内部服务错误'));
    }
    log +=
      '\nurl -> ' +
      request.url +
      '\nmsg -> ' +
      exception.message +
      '\nstack -> ' +
      exception.stack;
    this.loggerService.error(log);
  }
}
