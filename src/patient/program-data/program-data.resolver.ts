import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { SuccessJSONResponse } from 'src/shared-module/generic/generic-model-type';
import { ProgramDataArgs } from './dto/program.dto';
import { ProgramDataService } from './program-data.service';
import { UseGuards } from '@nestjs/common';
import { Level } from 'src/authentication/actions-users/dto/users.enum';
import { JwtGuard } from 'src/authentication/guards/jwt.guard';
import { RolesGuardGuard } from 'src/shared-module/roles-guard/roles-guard.guard';
import { GenericSuccessResponse } from 'src/shared-module/generic/response-helper';

@Resolver()
export class ProgramDataResolver {
  constructor(private readonly service: ProgramDataService) {}

  @Mutation(() => SuccessJSONResponse)
  @UseGuards(JwtGuard, new RolesGuardGuard(Level.Patient))
  async programform(
    @Args('argsData') argsData: ProgramDataArgs,
    @Context('data') data,
  ): Promise<SuccessJSONResponse> {
    try {
      const { uid } = data;
      argsData.uid = uid;
      const res = await this.service.programData(argsData);
      return GenericSuccessResponse(JSON.parse(JSON.stringify(res)));
    } catch (ex) {
      return ex;
    }
  }
}
