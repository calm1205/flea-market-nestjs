import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  // reflectorはmetaデータを取得するためのもの
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredStatuses = this.reflector.get<string[]>(
      'statuses', // 取得したいmetaデータのkey
      context.getHandler(),
    );

    if (!requiredStatuses) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    return requiredStatuses.some((status) => user.status.includes(status));
  }
}
