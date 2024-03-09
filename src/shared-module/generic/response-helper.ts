import {
  GenericErrorResponseFilter,
  GenericResponse,
  GenericResponseSuccess,
  PaginatedResponse,
} from './generic';

export type AppResponses<T> =
  | GenericResponse<T>
  | GenericResponseSuccess
  | GenericErrorResponseFilter;

export function GenericSuccessResponse<T>(data: T): GenericResponse<T> {
  return {
    success: true,
    error: '',
    message: '',
    data: data,
  };
}

export function GenericSuccessPaginatedResponse<T>(
  data: T[],
  total: number,
  page: number,
  per_page: number,
  next: any,
  previous: any,
): GenericResponse<PaginatedResponse<T>> {
  return {
    success: true,
    error: '',
    message: '',
    data: {
      page: page,
      total: total,
      per_page: per_page,
      next: next,
      previous: previous,
      items: data,
    },
  };
}

export function GenericErrorResponse(
  error: string,
  message: any = null,
): GenericResponse<any> {
  return {
    success: false,
    error: error,
    message: '',
    data: message ?? {},
  };
}
