import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ContactUsArgs } from '../dto/contact-us.dto';
import {
  GenericErrorResponse,
  GenericSuccessResponse,
} from 'src/shared-module/generic/response-helper';
import { MainService } from './main.service';

@Resolver()
export class MainResolver {
  constructor(private readonly service: MainService) {}
  @Mutation(() => String, { name: 'contactUs' })
  async contactUs(@Args('rawData') rawData: ContactUsArgs): Promise<string> {
    try {
      const response = await this.service.contactUSInsert(rawData);
      return response;
    } catch (ex) {
      return ex;
    }
  }
}
