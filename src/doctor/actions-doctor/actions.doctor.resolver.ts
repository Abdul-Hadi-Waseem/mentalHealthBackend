import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ActionsDoctorsService } from './actions.doctor.services';
import { CreateDoctorDto } from './dto/createDoctorProfileDto';
// import {
//   ActionsUsersLoginModel,
//   ActionsUsersModel,
// } from './dto/actions-users.model/actions-users.model';
import {
  ActionsDoctorLoginModel,
  ActionsDoctorModel
} from './dto/models/actions.doctor.model';

import {
  GenericErrorResponse,
  GenericSuccessResponse,
} from 'src/shared-module/generic/response-helper';
import { SuccessJSONResponse } from 'src/shared-module/generic/generic-model-type';



@Resolver()
export class ActionsDoctorsResolver {
  constructor(
    private readonly service: ActionsDoctorsService,
  ) {}
  
  @Mutation(() => ActionsDoctorModel, { name: 'actionsDoctorProfileRegistration' })
  async actionsDoctorProfileRegistration(
    @Args('rawData') rawData: CreateDoctorDto,
  ): Promise<ActionsDoctorModel> {
    try {
      console.log("fayyaz")
      return await this.service.actionsDoctorProfileRegistration(rawData);
    } catch (ex) {
      return GenericErrorResponse(ex);
    }
  }
}