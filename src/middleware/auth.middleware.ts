import { Injectable, NestMiddleware } from '@nestjs/common';
import { FlashException } from '../exception/flash.exception';
import { UserService } from '../modules/user/user.service';
import { JwtUtil } from '../utils/jwt.util';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}
  async use(req: any, res: any, next: (error?: any) => void): Promise<any> {
    const token = req.headers.token;
    if (token) {
      try {
        const decoded: any = JwtUtil.parseToken(token);
        const user = await this.userService.findById(decoded.id);
        req.user = user;
      } catch {
        throw new FlashException('Authentication failure.', -1);
      }
      next();
    } else {
      throw new FlashException('Not authorized.');
    }
  }
}
