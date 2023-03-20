import { Injectable } from '@nestjs/common';
import { ConfigService } from 'nestjs-config';
import { MailerService } from '@nestjs-modules/mailer';
import { FlashException } from '../../exception/flash.exception';

@Injectable()
export class EmailService {
  private readonly from: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly mailerService: MailerService,
  ) {
    const emailConfig = configService.get('email');
    this.from = emailConfig.transport.auth.user;
  }

  async sendVerifyCodeEmail(to: string, code: string) {
    try {
      await this.mailerService.sendMail({
        to: to,
        from: this.from,
        subject: 'Flash Verification Code',
        html: `<b>验证码为：${code}</b>`,
      });
    } catch (error) {
      throw new FlashException('邮件发送失败').add('error', error);
    }
  }
}
