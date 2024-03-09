import { Injectable } from '@nestjs/common';
import { Utility } from 'src/shared-module/generic/utility.class';
import { DataSource } from 'typeorm';
import { ContactUsArgs } from '../dto/contact-us.dto';
import { GenericResponse } from 'src/shared-module/generic/generic';
import { GenericSuccessResponse } from 'src/shared-module/generic/response-helper';

@Injectable()
export class MainService {
  constructor(
    private readonly connection: DataSource,
    private readonly utility: Utility,
  ) {}

  async contactUSInsert(argsData: ContactUsArgs): Promise<string> {
    try {
      const insertResponse = await this.connection.query(
        `INSERT INTO public.r01_contact_us (name, email, phone, message, status)
        VALUES($1,$2,$3,$4,$5)`,
        [
          argsData.name,
          argsData.email.toLowerCase().toString(),
          argsData.phone,
          argsData.message,
          1,
        ],
      );
      const msg = `Thank you for contacting Us!`;
      console.log(insertResponse);
      this.utility.sendEmail(
        argsData.email.toLowerCase().toString(),
        'Contact-Us',
        msg,
      );
      return msg;
    } catch (ex) {
      return ex;
    }
  }
}
