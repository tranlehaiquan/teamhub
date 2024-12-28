import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { SetMetadata } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { IS_PUBLIC } from '../constants';

// set metadata authenticate is optional
export const AuthIsPublic = () => SetMetadata(IS_PUBLIC, true);

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): { id: string } | undefined => {
    const request =
      ctx.switchToHttp().getRequest() ||
      GqlExecutionContext.create(ctx).getContext().req;

    return request.user as { id: string };
  },
);
