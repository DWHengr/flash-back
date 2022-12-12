import { UserEntity } from '../modules/user/user.entity';
import * as jwt from 'jsonwebtoken';
export class JwtUtil {
  private static SECRET = 'flash-secret';
  public static createToken(user: UserEntity) {
    return jwt.sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      this.SECRET,
      { expiresIn: '7d', issuer: 'flash' },
    );
  }

  public static parseToken(token: string): any {
    jwt.verify(token, this.SECRET);
  }
}
