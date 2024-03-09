import { ObjectType, Field } from '@nestjs/graphql';
import { GenericGraphQlResponse } from './generic';
import GraphQLJSON from 'graphql-type-json';

@ObjectType({ implements: GenericGraphQlResponse })
export class SuccessResponse implements GenericGraphQlResponse<string> {
  @Field(() => Boolean)
  success: boolean;

  @Field(() => String)
  error: string;

  @Field(() => String)
  message: string;

  @Field(() => String)
  data: string;
}
@ObjectType({ implements: GenericGraphQlResponse })
export class SuccessJSONResponse implements GenericGraphQlResponse<JSON> {
  @Field(() => Boolean)
  success: boolean;

  @Field(() => String)
  error: string;

  @Field(() => String)
  message: string;

  @Field(() => GraphQLJSON)
  data: JSON;
}

@ObjectType()
export class ErrorResponse implements GenericGraphQlResponse<[]> {
  @Field(() => Boolean)
  success: boolean;

  @Field(() => String)
  error: string;

  @Field(() => String)
  message: string;

  data: [];
}
