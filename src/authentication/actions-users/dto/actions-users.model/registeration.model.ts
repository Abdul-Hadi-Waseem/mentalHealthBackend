import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  IsString,
  IsDateString,
  IsEmail,
  IsEnum,
  IsPhoneNumber,
} from 'class-validator';
import { Gender, Level } from '../users.enum';

@ObjectType()
export class registrationModel {
  @Field(() => String)
  name: string;

  @Field(() => String)
  @IsDateString()
  dob: string;

  @Field(() => String)
  @IsEmail()
  email: string;

  @Field(() => String)
  @IsString()
  password: string;

  @Field(() => Int)
  @IsEnum(Gender)
  gender: Gender;

  @Field(() => Int)
  @IsEnum(Level)
  level: Level;

  @Field(() => String)
  @IsPhoneNumber('PK')
  phone: string;

  @Field(() => String, { nullable: true })
  address: string;

  @Field(() => String, { nullable: true })
  country: string;

  @Field(() => String, { nullable: true })
  city: string;

  @Field(() => String, { nullable: true })
  state: string;

  @Field(() => String, { nullable: true })
  zip_code: string;

  @Field(() => String, { nullable: true })
  institute_name: string;
}
