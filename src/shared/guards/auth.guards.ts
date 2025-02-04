import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Logger,
} from '@nestjs/common';
import { AuthService } from '~/modules/auth/auth.service';
import { FastifyRequest } from 'fastify';

@Injectable()
export class AuthGuard implements CanActivate {
  logger = new Logger('AuthGuard');

  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest<FastifyRequest>();
      const token: string = request.headers['authorization'] as string;
      if (!token) return false;
      request.user = await this.authService.verifyToken(token);
      // this.logger.log('User', JSON.stringify(request.user));
      return true;
    } catch (e) {
      this.logger.error(e);
      return false;
    }
  }
}
