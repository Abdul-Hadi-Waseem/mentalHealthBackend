import { Module } from '@nestjs/common';
import { ActionsUsersResolver } from './actions-users/actions-users.resolver';
import { ActionsUsersService } from './actions-users/actions-users.service';
import { SharedModuleModule } from 'src/shared-module/shared-module.module';
import { JwtService } from './guards/jwt.service';
@Module({
  imports: [SharedModuleModule],
  providers: [ActionsUsersResolver, ActionsUsersService, JwtService],
})
export class AuthenticationModule {}
