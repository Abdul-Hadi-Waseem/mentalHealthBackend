import { DataSource } from 'typeorm';
import { MailerService } from '@nestjs-modules/mailer';
export declare class Utility {
    private readonly connection;
    private readonly mailerService;
    constructor(connection: DataSource, mailerService: MailerService);
    existsOrNot: (eav: any, _value?: string, _value2?: string) => Promise<boolean | {}>;
    dynamicQuery: (eav: any, _value?: string, _value2?: string, _limit?: true, _in?: true) => Promise<boolean | {}>;
    sendEmail(destination: string, subject: string, content: string): Promise<void>;
    getMomentUnix(): string;
    setMomentUnix(date?: string): string;
}
