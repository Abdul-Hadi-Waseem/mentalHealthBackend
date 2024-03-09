import { InputType, Field } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';

@InputType()
export class ProgramDataArgs {
  @Field(() => Number)
  formId: number;

  @Field(() => GraphQLJSON)
  metadata: JSON;

  uid: string;
  name: string;
  score: string;
}
