import { Injectable, NestMiddleware } from '@nestjs/common';
import { FlashException } from '../exception/flash.exception';
import { UserService } from '../modules/user/user.service';
import { JwtUtil } from '../utils/jwt.util';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}
  use(req: any, res: any, next: (error?: any) => void): any {
    const token = req.headers.token;
    if (token) {
      const decoded: any = JwtUtil.parseToken(token);
      const user = this.userService.findById(decoded.id);
      req.user = user;
      next();
    } else {
      throw new FlashException('Not authorized.');
    }
  }
}
