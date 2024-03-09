import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ActionsUsersService } from '../actions-users/actions-users.service';

@Injectable()
export class AuthGuardGuard implements CanActivate {
  constructor(private readonly service: ActionsUsersService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context).getContext();
    const bodyData = ctx.req.body.variables.Data;
    console.log(bodyData);
    const response = await this.service.login(bodyData);
    try {
      console.log(bodyData);
      if (response['verified'] === true) {
        ctx.data = response;
        return true;
      }
      throw new HttpException('UnAuthentication', HttpStatus.UNAUTHORIZED);
    } catch (ex) {
      if (response['code'] === '401') {
        throw new HttpException(response['message'], HttpStatus.UNAUTHORIZED);
      }
      if (response['code'] === '404') {
        throw new HttpException(response['message'], HttpStatus.NOT_FOUND);
      }
    }
  }
}
