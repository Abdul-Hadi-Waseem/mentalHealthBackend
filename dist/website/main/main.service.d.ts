import { Utility } from 'src/shared-module/generic/utility.class';
import { DataSource } from 'typeorm';
import { ContactUsArgs } from '../dto/contact-us.dto';
export declare class MainService {
    private readonly connection;
    private readonly utility;
    constructor(connection: DataSource, utility: Utility);
    contactUSInsert(argsData: ContactUsArgs): Promise<string>;
}
