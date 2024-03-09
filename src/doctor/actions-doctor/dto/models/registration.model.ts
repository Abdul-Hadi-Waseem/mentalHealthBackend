import { Field, ObjectType } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';
import {
  IsString,
  IsDateString,
  IsEmail,
  IsEnum,
  IsPhoneNumber,
} from 'class-validator';

@ObjectType()
export class registrationModel {
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
  clinic_shcedule: JSON;

}
