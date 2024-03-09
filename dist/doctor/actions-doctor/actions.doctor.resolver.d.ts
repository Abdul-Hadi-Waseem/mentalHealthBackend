import { ActionsDoctorsService } from './actions.doctor.services';
import { CreateDoctorDto } from './dto/createDoctorProfileDto';
import { ActionsDoctorModel } from './dto/models/actions.doctor.model';
export declare class ActionsDoctorsResolver {
    private readonly service;
    constructor(service: ActionsDoctorsService);
    actionsDoctorProfileRegistration(rawData: CreateDoctorDto): Promise<ActionsDoctorModel>;
}
