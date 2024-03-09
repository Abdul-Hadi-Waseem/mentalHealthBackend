import { GenericGraphQlResponse } from './generic';
export declare class SuccessResponse implements GenericGraphQlResponse<string> {
    success: boolean;
    error: string;
    message: string;
    data: string;
}
export declare class SuccessJSONResponse implements GenericGraphQlResponse<JSON> {
    success: boolean;
    error: string;
    message: string;
    data: JSON;
}
export declare class ErrorResponse implements GenericGraphQlResponse<[]> {
    success: boolean;
    error: string;
    message: string;
    data: [];
}
