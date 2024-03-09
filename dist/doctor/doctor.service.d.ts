import { DoctorEntity } from './entity/doctor.entity';
import { Repository } from 'typeorm';
import { AddDoctorArgs } from './args/add.doctor.args';
export declare class DoctorService {
    readonly doctorRepo: Repository<DoctorEntity>;
    constructor(doctorRepo: Repository<DoctorEntity>);
    addDoctorProfile(addDoctorArgs: AddDoctorArgs): Promise<string>;
    findAllBooks(): Promise<DoctorEntity[]>;
}
