import { InputType , Field , Int} from "@nestjs/graphql";

@InputType()
export class AddDoctorArgs{
  // not for database due to auto generated from db
  // @Field((type)=> Int)
  // id: number ;

  @Field()
  college: string;

  @Field()
  course: string;
}