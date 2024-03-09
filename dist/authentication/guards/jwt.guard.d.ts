import { CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from './jwt.service';
export declare class JwtGuard implements CanActivate {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
