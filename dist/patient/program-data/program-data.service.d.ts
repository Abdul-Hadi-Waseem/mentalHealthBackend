import { Utility } from 'src/shared-module/generic/utility.class';
import { DataSource } from 'typeorm';
import { ProgramDataArgs } from './dto/program.dto';
export declare class ProgramDataService {
    private readonly connection;
    private readonly utility;
    constructor(connection: DataSource, utility: Utility);
    pscAnswers: {
        Never: number;
        Sometimes: number;
        Often: number;
    }[];
    score_ranges: {
        min_score: number;
        max_score: number;
        interpretation: string;
    }[];
    quiz: {
        question: string;
        options: {
            text: string;
            score: number;
        }[];
    }[];
    programData(argsData: ProgramDataArgs): Promise<string>;
    insertForm(argsData: ProgramDataArgs): Promise<void>;
    pscQuizResult(TestName: string, metadata: JSON): Promise<object>;
    anxietyQuizCalculateResult(quiz: any, submittedAnswers: any): Promise<object>;
}
