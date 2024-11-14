import {
  ExecutionContext,
  UnauthorizedException,
  createParamDecorator,
} from '@nestjs/common';

export type AuthenticatedUser = {
  id: number;
  email: string;
};

export const AuthenticatedUser = createParamDecorator<undefined>(
  (data, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    if (!request.user) {
      throw new UnauthorizedException();
    }

    return request.user as AuthenticatedUser;
  },
);
