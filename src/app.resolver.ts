import { Query, Resolver } from '@nestjs/graphql';
import { SuccessResponse } from './shared-module/generic/generic-model-type';

@Resolver((of) => SuccessResponse)
export class AppResolver {
  @Query((returns) => SuccessResponse)
  async main(): Promise<SuccessResponse> {
    const response: SuccessResponse = {
      success: true,
      error: '',
      message: '',
      data: 'Mental-Health',
    };
    return response;
  }
}
