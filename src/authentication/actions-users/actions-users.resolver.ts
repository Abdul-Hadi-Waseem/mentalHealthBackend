import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ActionsUsersService } from './actions-users.service';
import { CreateUserDto } from './dto/createUserDto';
import {
  ActionsUsersLoginModel,
  ActionsUsersModel,
} from './dto/actions-users.model/actions-users.model';
import {
  GenericErrorResponse,
  GenericSuccessResponse,
} from 'src/shared-module/generic/response-helper';
import { LoginDto } from './dto/login.dto';
import { AuthGuardGuard } from '../guards/auth-guard.guard';
import { UseGuards } from '@nestjs/common';
import { JwtService } from '../guards/jwt.service';
import { JwtGuard } from '../guards/jwt.guard';
import { RolesGuardGuard } from 'src/shared-module/roles-guard/roles-guard.guard';
import { Level } from './dto/users.enum';
import { SuccessJSONResponse } from 'src/shared-module/generic/generic-model-type';

@Resolver()
export class ActionsUsersResolver {
  constructor(
    private readonly service: ActionsUsersService,
    private readonly jwtService: JwtService,
  ) {}

  @Mutation(() => ActionsUsersModel, { name: 'actionsUsersRegistration' })
  async actionsUsersRegistration(
    @Args('rawData') rawData: CreateUserDto,
  ): Promise<ActionsUsersModel> {
    try {
      return await this.service.actionsUsersRegistration(rawData);
    } catch (ex) {
      return GenericErrorResponse(ex);
    }
  }

  @Mutation(() => ActionsUsersModel, { name: 'instituteRegistration' })
  async instituteRegistration(
    @Args('rawData') rawData: CreateUserDto,
  ): Promise<ActionsUsersModel> {
    try {
      return await this.service.instituteRegistration(rawData);
    } catch (ex) {
      return GenericErrorResponse(ex);
    }
  }

  @Query(() => ActionsUsersLoginModel, { name: 'login' })
  @UseGuards(AuthGuardGuard)
  async login(
    @Args('rawData') rawData: LoginDto,
    @Context('data') data,
  ): Promise<ActionsUsersLoginModel> {
    try {
      // console.log('data=====', data);
      delete data['verified'];
      delete data['message'];
      delete data['statusCode'];
      const dictionary = await this.service.Dictionary();
      // console.log(dictionary);
      const response = {
        name: data['name'],
        age: data['age'],
        uid: data['uid'],
        token: await this.jwtService.generateToken(data),
        dictionary: dictionary,
        assessment: await this.service.assessmentDictionary(data),
      };
      return GenericSuccessResponse(JSON.parse(JSON.stringify(response)));
    } catch (ex) {
      return GenericErrorResponse(ex);
    }
  }

  @Query(() => SuccessJSONResponse, { name: 'dictionary' })
  @UseGuards(JwtGuard, new RolesGuardGuard(Level.Patient))
  async dictionary(@Context('data') data): Promise<SuccessJSONResponse> {
    try {
      const assessment = await this.service.assessmentDictionary(data);
      const dictionary = await this.service.Dictionary();
      const response = {
        dictionary: dictionary,
        assessment: assessment,
      };
      return GenericSuccessResponse(JSON.parse(JSON.stringify(response)));
    } catch (ex) {
      return GenericErrorResponse(ex);
    }
  }
  // @UseGuards(JwtGuard)
  // @Query(':email')
  // async deletePatient(@Context('email') email: string): Promise<any> {
  //   try {
  //     // Assuming you have a method to delete the patient entry in your service
  //     const deleteResponse = await this.service.deletePatient(email);
  //     if (deleteResponse['status'] == true) {
  //       return GenericSuccessResponse('Patient deleted successfully');
  //     } else {
  //       return GenericErrorResponse('Failed to delete patient', '');
  //     }
  //   } catch (ex) {
  //     return GenericErrorResponse(ex);
  //   }
  // }
}
