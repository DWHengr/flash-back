import { Injectable } from '@nestjs/common';
import * as log4js from 'log4js';
import { Logger } from 'log4js';
import { ConfigService } from 'nestjs-config';

@Injectable()
export class LoggerService {
  private errLogger: Logger;

  constructor(private readonly configService: ConfigService) {
    const log4jsConfig = configService.get('log4js');
    this.init(log4jsConfig);
  }

  private init(log4jsConfig: any) {
    log4js.configure({
      appenders: {
        console: { type: 'console' },
        err: {
          type: 'file',
          filename: log4jsConfig.path ? log4jsConfig.path : 'D:/logs/flash.log',
        },
      },
      categories: {
        default: {
          appenders: ['console'],
          level: 'ALL',
        },
        error: { appenders: ['err', 'console'], level: 'ALL' },
      },
    });
    this.errLogger = log4js.getLogger('error');
  }

  public error(message: string) {
    this.errLogger.error(message);
  }
}
