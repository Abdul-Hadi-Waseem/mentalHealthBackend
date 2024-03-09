import { GenericResponse } from 'src/shared-module/generic/generic';
import { DataSource } from 'typeorm';
import { Utility } from 'src/shared-module/generic/utility.class';
import { CreateDoctorDto } from './dto/createDoctorProfileDto';
export declare class ActionsDoctorsService {
    private readonly connection;
    private readonly utility;
    constructor(connection: DataSource, utility: Utility);
    actionsDoctorProfileRegistration(argsData: CreateDoctorDto): Promise<GenericResponse<string>>;
}
