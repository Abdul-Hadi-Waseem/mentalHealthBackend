import { SuccessJSONResponse } from 'src/shared-module/generic/generic-model-type';
import { ProgramDataArgs } from './dto/program.dto';
import { ProgramDataService } from './program-data.service';
export declare class ProgramDataResolver {
    private readonly service;
    constructor(service: ProgramDataService);
    programform(argsData: ProgramDataArgs, data: any): Promise<SuccessJSONResponse>;
}
