import { DoctorService } from "./doctor.service";
import { AddDoctorArgs } from "./args/add.doctor.args";
export declare class DoctorResolver {
    private readonly doctorService;
    constructor(doctorService: DoctorService);
    getAllDoctors(): any;
    addDocotorProfile(addDoctorArgs: AddDoctorArgs): Promise<string>;
}
