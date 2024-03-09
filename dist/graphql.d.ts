export interface LoginDto {
    email: string;
    password: string;
    level: number;
}
export interface ProgramDataArgs {
    formId: number;
    metadata: JSON;
}
export interface AddDoctorArgs {
    college: string;
    course: string;
}
export interface CreateUserDto {
    name: string;
    dob?: Nullable<string>;
    email: string;
    password: string;
    gender?: Nullable<number>;
    level?: Nullable<number>;
    phone: string;
    address?: Nullable<string>;
    country?: Nullable<string>;
    city?: Nullable<string>;
    state?: Nullable<string>;
    zip_code?: Nullable<string>;
    institute_name?: Nullable<string>;
}
export interface ContactUsArgs {
    name: string;
    email: string;
    phone: string;
    message: string;
}
export interface GenericGraphQlResponse {
    success: boolean;
    error: string;
    message: string;
}
export interface SuccessResponse extends GenericGraphQlResponse {
    success: boolean;
    error: string;
    message: string;
    data: string;
}
export interface SuccessJSONResponse extends GenericGraphQlResponse {
    success: boolean;
    error: string;
    message: string;
    data: JSON;
}
export interface Doctor {
    id: number;
    college: string;
    course: string;
}
export interface ActionsUsersModel extends GenericGraphQlResponse {
    success: boolean;
    error: string;
    message: string;
    data: string;
}
export interface ActionsUsersLoginModel extends GenericGraphQlResponse {
    success: boolean;
    error: string;
    message: string;
    data: JSON;
}
export interface IQuery {
    main(): SuccessResponse | Promise<SuccessResponse>;
    doctors(): Doctor[] | Promise<Doctor[]>;
    login(rawData: LoginDto): ActionsUsersLoginModel | Promise<ActionsUsersLoginModel>;
    dictionary(): SuccessJSONResponse | Promise<SuccessJSONResponse>;
}
export interface IMutation {
    programform(argsData: ProgramDataArgs): SuccessJSONResponse | Promise<SuccessJSONResponse>;
    addDoctorProfile(addDoctorArgs: AddDoctorArgs): string | Promise<string>;
    actionsUsersRegistration(rawData: CreateUserDto): ActionsUsersModel | Promise<ActionsUsersModel>;
    instituteRegistration(rawData: CreateUserDto): ActionsUsersModel | Promise<ActionsUsersModel>;
    contactUs(rawData: ContactUsArgs): string | Promise<string>;
}
export type JSON = any;
type Nullable<T> = T | null;
export {};
