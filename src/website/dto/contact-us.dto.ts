import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsPhoneNumber } from 'class-validator';

@InputType()
export class ContactUsArgs {
  @Field(() => String)
  name: string;

  @Field(() => String)
  @IsEmail()
  email: string;

  @Field(() => String)
  @IsPhoneNumber('PK')
  phone: string;

  @Field(() => String)
  message: string;
}
