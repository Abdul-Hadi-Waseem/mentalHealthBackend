import { Gender, Level } from './users.enum';
export declare class CreateUserDto {
    name: string;
    dob: string;
    email: string;
    password: string;
    gender: Gender;
    level: Level;
    phone: string;
    address: string;
    country: string;
    city: string;
    state: string;
    zip_code: string;
    institute_name: string;
}
