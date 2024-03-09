import { CanActivate, ExecutionContext } from '@nestjs/common';
export declare class RolesGuardGuard implements CanActivate {
    role: number;
    constructor(role: number);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
