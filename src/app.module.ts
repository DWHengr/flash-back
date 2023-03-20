import { resolve } from 'path';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from 'nestjs-config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestModule } from './modules/test/test.module';
import { UserModule } from './modules/user/user.module';
import { GlobalExceptionFilter } from './filter/global.exception.filter';
import { APP_FILTER } from '@nestjs/core';
import { LoggerModule } from './modules/logger/logger.module';
import { AuthMiddleware } from './middleware/auth.middleware';
import { CollocateModule } from './modules/collocate/collocate.module';
import { EmailModule } from './modules/email/email.module';

@Module({
  imports: [
    ConfigModule.load(resolve(__dirname, 'config', '**/!(*.d).{ts,js}')),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => config.get('database'),
      inject: [ConfigService],
    }),
    LoggerModule,
    EmailModule,
    TestModule,
    CollocateModule,
    UserModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude('v1/user/login', 'v1/user/register')
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
