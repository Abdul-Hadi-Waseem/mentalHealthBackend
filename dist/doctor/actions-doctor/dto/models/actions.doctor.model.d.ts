import { GenericGraphQlResponse } from 'src/shared-module/generic/generic';
export declare class ActionsDoctorModel implements GenericGraphQlResponse<string> {
    success: boolean;
    error: string;
    message: string;
    data: string;
}
export declare class ActionsDoctorLoginModel implements GenericGraphQlResponse<JSON> {
    success: boolean;
    error: string;
    message: string;
    data: JSON;
}
