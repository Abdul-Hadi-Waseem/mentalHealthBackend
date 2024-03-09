import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import * as jwt from 'jsonwebtoken';
import { JwtService } from './jwt.service';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context).getContext();
    const authorizationHeader = ctx.req.headers.authorization;
    if (authorizationHeader) {
      const token = authorizationHeader.split(' ')[1];
      try {
        const decodeDate = this.jwtService.verifyToken(token);
        ctx.data = decodeDate;
      } catch (ex) {
        throw new HttpException('Invalid Token', HttpStatus.FORBIDDEN);
      }
    }
    return true;
  }
}
