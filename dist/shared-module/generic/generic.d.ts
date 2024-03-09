export declare abstract class GenericGraphQlResponse<T> {
    success: boolean;
    error: string;
    message: string;
    data: T;
}
export interface GenericResponse<T> {
    success: boolean;
    error: string;
    message: string;
    data: T;
}
export interface GenericResponseReturn<T> {
    data: T;
}
export interface PaginatedResponse<I> {
    page: number;
    total: number;
    per_page: number;
    next: number;
    previous: number;
    items: I[];
}
export interface GenericResponseSuccess {
    success: boolean;
}
export interface GenericErrorResponseFilter {
    errorMessage: string;
    errorType: string;
    server: string;
}
