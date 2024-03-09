import { ContactUsArgs } from '../dto/contact-us.dto';
import { MainService } from './main.service';
export declare class MainResolver {
    private readonly service;
    constructor(service: MainService);
    contactUs(rawData: ContactUsArgs): Promise<string>;
}
