import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class RolesGuardGuard implements CanActivate {
  public role: number;
  constructor(role: number) {
    this.role = role;
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context).getContext();
    const { role } = ctx.data;
    console.log(role);
    if (role === this.role) return true;
    return false;
  }
}
