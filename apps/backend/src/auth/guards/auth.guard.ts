import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { IS_PUBLIC } from '../constants';

// by default all routes are protected
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request =
      context.switchToHttp().getRequest() ||
      GqlExecutionContext.create(context).getContext().req;

    try {
      const token = (request.headers.authorization as string).split(' ')[1];
      const decode = await this.jwtService.verifyAsync(token);
      request.user = decode;

      return !!decode;
    } catch {
      const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC, [
        context.getHandler(),
        context.getClass(),
      ]);

      return !!isPublic;
    }
  }
}
