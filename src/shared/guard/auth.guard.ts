import { JwtService } from '@nestjs/jwt';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const authorization = request.headers.authorization;

      if (!authorization)
        throw new UnauthorizedException('Unauthorized access');

      const bearer = authorization.split(' ');

      if (bearer.length !== 2 || bearer[0]?.toLowerCase() !== 'bearer')
        throw new UnauthorizedException('Unauthorized access');

      const token = bearer[1];

      const { _id, email }: { _id: string; email: string } =
        await this.jwtService.verifyAsync(token, {
          secret: process.env.JWT_SECRET_ACCESS_TOKEN,
        });

      request['_id'] = _id;
      request['email'] = email;
    } catch (err) {
      if (err instanceof UnauthorizedException) throw err;
      throw new UnauthorizedException('Unauthorized access');
    }
    return true;
  }
}
