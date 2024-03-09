import { GenericResponse } from 'src/shared-module/generic/generic';
import { DataSource } from 'typeorm';
import { CreateUserDto } from './dto/createUserDto';
import { Utility } from 'src/shared-module/generic/utility.class';
import { LoginDto } from './dto/login.dto';
import { AssessmentDto } from './dto/assessment.dto';
export declare class ActionsUsersService {
    private readonly connection;
    private readonly utility;
    constructor(connection: DataSource, utility: Utility);
    instituteRegistration(argsData: CreateUserDto): Promise<GenericResponse<string>>;
    actionsUsersRegistration(argsData: CreateUserDto): Promise<GenericResponse<string>>;
    hashPassword(password: string): Promise<string>;
    passwordMatcher(password: string, hash: string): Promise<boolean>;
    login(argsData: LoginDto): Promise<object>;
    assessmentDictionary(argsData: AssessmentDto): Promise<object>;
    Dictionary(): Promise<object>;
}
