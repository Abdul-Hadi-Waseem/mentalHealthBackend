import { Field, InputType, Int } from '@nestjs/graphql';
import {
  IsString,
} from 'class-validator';
import GraphQLJSON from 'graphql-type-json';

@InputType()
export class CreateDoctorDto {
  @Field(() => String)
  @IsString()
  college_name: string;

  @Field(() => String)
  @IsString()
  course: string;

  @Field(() => String)
  @IsString()
  year: string;

  @Field(() => GraphQLJSON,{ nullable: true })
  certificates: JSON;

  @Field(() => GraphQLJSON,{ nullable: true })
  professional_experience: JSON;

  @Field(() => GraphQLJSON,{ nullable: true })
  clinic_schedule: JSON;
}
