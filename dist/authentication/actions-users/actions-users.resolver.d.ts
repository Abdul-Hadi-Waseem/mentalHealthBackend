import { ActionsUsersService } from './actions-users.service';
import { CreateUserDto } from './dto/createUserDto';
import { ActionsUsersLoginModel, ActionsUsersModel } from './dto/actions-users.model/actions-users.model';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '../guards/jwt.service';
import { SuccessJSONResponse } from 'src/shared-module/generic/generic-model-type';
export declare class ActionsUsersResolver {
    private readonly service;
    private readonly jwtService;
    constructor(service: ActionsUsersService, jwtService: JwtService);
    actionsUsersRegistration(rawData: CreateUserDto): Promise<ActionsUsersModel>;
    instituteRegistration(rawData: CreateUserDto): Promise<ActionsUsersModel>;
    login(rawData: LoginDto, data: any): Promise<ActionsUsersLoginModel>;
    dictionary(data: any): Promise<SuccessJSONResponse>;
}
