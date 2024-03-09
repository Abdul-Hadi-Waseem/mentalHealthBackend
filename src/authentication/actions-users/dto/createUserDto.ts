import { Field, InputType, Int } from '@nestjs/graphql';
import {
  IsString,
  IsDateString,
  IsEmail,
  IsEnum,
  IsPhoneNumber,
} from 'class-validator';
import { Gender, Level } from './users.enum';

@InputType()
export class CreateUserDto {
  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  @IsDateString()
  dob: string;

  @Field(() => String)
  @IsEmail()
  email: string;

  @Field(() => String)
  @IsString()
  password: string;

  @Field(() => Int, { nullable: true })
  @IsEnum(Gender)
  gender: Gender;

  @Field(() => Int, { nullable: true })
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
