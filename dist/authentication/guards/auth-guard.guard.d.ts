import { CanActivate, ExecutionContext } from '@nestjs/common';
import { ActionsUsersService } from '../actions-users/actions-users.service';
export declare class AuthGuardGuard implements CanActivate {
    private readonly service;
    constructor(service: ActionsUsersService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
