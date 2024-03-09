import { Module } from '@nestjs/common';
import { SuccessResponse, ErrorResponse } from './generic/generic-model-type';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Utility } from './generic/utility.class';
import { MailerModule } from '@nestjs-modules/mailer';
import * as dotenv from 'dotenv';
dotenv.config();
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      // host: process.env.HOST,
      // port: parseInt(process.env.DB_PORT) ?? 5432,
      // username: process.env.USERNAME,
      // password: process.env.PASSWORD,
      // database: process.env.DATABASE,
      host: "139.99.28.47",
      port: 5432,
      username: "postgres",
      password: "Mental@9252411",
      database: "mental_health_db",
      logging: true,
      synchronize: false,
      // ssl: {
      //   rejectUnauthorized: false,
      // },
    }),
    MailerModule.forRoot({
      transport: {
        host: process.env.MAIL_HOST,
        port: parseInt(process.env.MAIL_PORT),
        secure: false,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
        tls: {
          rejectUnauthorized: false,
        },
      },
    }),
  ],
  providers: [SuccessResponse, ErrorResponse, Utility],
  exports: [SuccessResponse, ErrorResponse, Utility],
})
export class SharedModuleModule { }
