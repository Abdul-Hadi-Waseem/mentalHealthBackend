import {ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Doctor {
  @Field((type)=>Int)
  id: number;

  @Field()
  college: string;

  @Field()
  course: string;

}