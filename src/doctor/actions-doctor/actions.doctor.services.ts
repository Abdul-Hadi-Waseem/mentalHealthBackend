import { Injectable, UnauthorizedException } from '@nestjs/common';
import { GenericResponse } from 'src/shared-module/generic/generic';
import {
  GenericSuccessResponse,
  GenericErrorResponse,
} from 'src/shared-module/generic/response-helper';
import { DataSource, In } from 'typeorm';
import { Utility } from 'src/shared-module/generic/utility.class';
import { CreateDoctorDto } from './dto/createDoctorProfileDto';



@Injectable()
export class ActionsDoctorsService {
  constructor(
    private readonly connection: DataSource,
    private readonly utility: Utility,
  ) { }




  async actionsDoctorProfileRegistration(
    // argsData: CreateUserDto,
    argsData: CreateDoctorDto,
  ): Promise<GenericResponse<string>> {
    try {
      console.log("argdsData", CreateDoctorDto)
      const doctorResponse = await this.connection.query(
        `INSERT INTO public.d02_doctor_details
             (college_name, course, course, certificates,professional_experience,clinic_schedule)
             VALUES ($1, $2, $3, $4, $5, $6)`,
        [
          argsData.college_name, argsData.course, argsData.course, argsData.professional_experience, argsData.clinic_schedule,
        ],
      );
      // eslint-disable-next-line @typescript-eslint/no-unused-vars

      // this.utility.sendEmail(
      //   argsData.email.toLowerCase().toString(),
      //   `Registeration`,
      //   `The User ${level} Successfully! Registered`,
      // );
      return GenericSuccessResponse(`Doctor Profile Successfully Registered!`);
    } catch (ex) {
      return GenericErrorResponse(ex);
    }
  }
}