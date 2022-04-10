import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/entities/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userRepository: UserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // jwtがリクエストのどこに付与されているか
      ignoreExpiration: false, // 有効期限切れを不正なものとして扱う
      secretOrKey: 'secret_key_of_this_app',
    });
  }

  // 処理の中で自動で呼ばれる。メソッド名はvalidateで固定
  // GetUserなどで使用されているrequestの値に格納される
  async validate(payload: { id: string; username: string }): Promise<User> {
    const { id, username } = payload;
    const user = await this.userRepository.findOne({ id, username });

    if (user) {
      return user;
    }
    throw new UnauthorizedException();
  }
}
