import { Field, InputType, Int } from '@nestjs/graphql';
import { IsString, IsEmail, IsEnum } from 'class-validator';
import { Level } from './users.enum';

@InputType()
export class LoginDto {
  @Field(() => String)
  @IsEmail()
  email: string;

  @Field(() => String)
  @IsString()
  password: string;

  @Field(() => Int)
  @IsEnum(Level)
  level: Level;
}
