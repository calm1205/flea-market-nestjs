import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// guardが適応されたmoduleはjwt認証が通過しないと弾かれる。
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
