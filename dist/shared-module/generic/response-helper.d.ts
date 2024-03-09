import { GenericErrorResponseFilter, GenericResponse, GenericResponseSuccess, PaginatedResponse } from './generic';
export type AppResponses<T> = GenericResponse<T> | GenericResponseSuccess | GenericErrorResponseFilter;
export declare function GenericSuccessResponse<T>(data: T): GenericResponse<T>;
export declare function GenericSuccessPaginatedResponse<T>(data: T[], total: number, page: number, per_page: number, next: any, previous: any): GenericResponse<PaginatedResponse<T>>;
export declare function GenericErrorResponse(error: string, message?: any): GenericResponse<any>;
