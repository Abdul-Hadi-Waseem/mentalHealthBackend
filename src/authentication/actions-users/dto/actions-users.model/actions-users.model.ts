import { ObjectType, Field } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';
import { GenericGraphQlResponse } from 'src/shared-module/generic/generic';
// import { JSONScalar } from 'src/shared-module/generic/json-scalar';

@ObjectType({ implements: GenericGraphQlResponse })
export class ActionsUsersModel implements GenericGraphQlResponse<string> {
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
export class ActionsUsersLoginModel implements GenericGraphQlResponse<JSON> {
  @Field(() => Boolean)
  success: boolean;

  @Field(() => String)
  error: string;

  @Field(() => String)
  message: string;

  @Field(() => GraphQLJSON)
  data: JSON;
}
