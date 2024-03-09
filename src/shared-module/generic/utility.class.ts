import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { MailerService } from '@nestjs-modules/mailer';
import * as moment from 'moment';
import * as dotenv from 'dotenv';
dotenv.config();
@Injectable()
export class Utility {
  constructor(
    private readonly connection: DataSource,
    private readonly mailerService: MailerService,
  ) {}

  existsOrNot = async (
    eav: any,
    _value?: string,
    _value2?: string,
    // eslint-disable-next-line @typescript-eslint/ban-types
  ): Promise<boolean | {}> => {
    try {
      let query = `select id,uid from ${eav._table_name} WHERE ${eav?._column1}=$1`;
      const params = [_value];

      if (eav?._column2 !== undefined) {
        query += ` and ${eav._column2}=$2 limit 1`;
        params.push(_value2);
      } else {
        query += ` limit 1`;
      }

      const res = await this.connection.query(query, params);
      console.log(res.length);
      const status = res.length > 0 ? true : false;
      const data = res.length > 0 ? res[0] : undefined;
      return { status, data };
    } catch (ex) {
      return ex;
    }
  };

  dynamicQuery = async (
    eav: any,
    _value?: string,
    _value2?: string,
    _limit?: true,
    _in?: true,
    // eslint-disable-next-line @typescript-eslint/ban-types
  ): Promise<boolean | {}> => {
    try {
      let query = `select ${eav._view} from ${eav._table_name}`;
      const params = [];

      if (eav?._column1 !== undefined) {
        query += ` WHERE ${eav?._column1}=$1`;
        params.push(_value);
      }
      if (eav?._column2 !== undefined) {
        query += ` and ${eav._column2}=$2 limit 1`;
        params.push(_value2);
      }
      if (_in == true) {
        query += ` WHERE ${eav?._column1} in $1`;
        params.push(_value);
      }
      if (_limit == true) {
        query += ` limit 1`;
      }

      const res = await this.connection.query(query, params);
      console.log(res.length);
      const status = res.length > 0 ? true : false;
      const data = res.length > 0 ? res : undefined;
      return { status, data };
    } catch (ex) {
      return ex;
    }
  };

  async sendEmail(
    destination: string,
    subject: string,
    content: string,
  ): Promise<void> {
    await this.mailerService.sendMail({
      from: process.env.MAIL_FROM,
      to: destination,
      subject,
      text: content,
    });
  }

  getMomentUnix(): string {
    return moment().unix().toString();
  }
  setMomentUnix(date?: string): string {
    return date == undefined
      ? moment(date).format('YYYY-MM-DD HH:mm:ss')
      : moment().format('YYYY-MM-DD HH:mm:ss');
  }
}
