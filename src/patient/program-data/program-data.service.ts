import { Injectable } from '@nestjs/common';
import { Utility } from 'src/shared-module/generic/utility.class';
import { DataSource } from 'typeorm';
import { ProgramDataArgs } from './dto/program.dto';
import { ProgramFormEnum } from './form.constant';

@Injectable()
export class ProgramDataService {
  constructor(
    private readonly connection: DataSource,
    private readonly utility: Utility,
  ) {}
  pscAnswers = [{ Never: 0, Sometimes: 1, Often: 2 }];
  score_ranges = [
    { min_score: 0, max_score: 40, interpretation: 'Stressed' },
    { min_score: 41, max_score: 70, interpretation: 'High stress' },
    {
      min_score: 71,
      max_score: 115,
      interpretation: 'Extreme level of anxiety',
    },
  ];
  quiz = [
    {
      question:
        'Most of the time do you find yourself taking actions for the plans you have set for your daily life?',
      options: [
        {
          text: 'Yes',
          score: 0,
        },
        {
          text: 'No',
          score: 15,
        },
      ],
    },
    {
      question:
        'Do you often find yourself having negative thoughts, repetitively?',
      options: [
        {
          text: 'Yes',
          score: 15,
        },
        {
          text: 'Sometimes',
          score: 8,
        },
        {
          text: 'No',
          score: 0,
        },
      ],
    },
    {
      question: 'Do you feel bothered by this?',
      options: [
        {
          text: 'Extremely',
          score: 20,
        },
        {
          text: 'Considerable',
          score: 15,
        },
        {
          text: 'Slightly',
          score: 10,
        },
        {
          text: 'Not at all',
          score: 0,
        },
      ],
    },
    {
      question: 'How do you feel when you achieve your goals?',
      options: [
        {
          text: 'Motivated',
          score: 0,
        },
        {
          text: 'Indifferent',
          score: 15,
        },
      ],
    },
    {
      question: 'Most of the time, do you feel overwhelmed in daily life?',
      options: [
        {
          text: 'Yes',
          score: 15,
        },
        {
          text: 'Sometimes',
          score: 10,
        },
        {
          text: 'No',
          score: 0,
        },
      ],
    },
    {
      question: 'On average, do you wake up feeling rested in the morning?',
      options: [
        {
          text: 'Most of the time',
          score: 5,
        },
        {
          text: 'Sometimes',
          score: 10,
        },
        {
          text: 'No',
          score: 15,
        },
      ],
    },
    {
      question:
        'Most of the time, do you find yourself being present at the moment?',
      options: [
        {
          text: 'Most of the time',
          score: 5,
        },
        {
          text: 'Sometimes',
          score: 10,
        },
        {
          text: 'No',
          score: 20,
        },
      ],
    },
  ];

  async programData(argsData: ProgramDataArgs): Promise<string> {
    try {
      let emailSubject: string;
      let emailMessage: string;
      if (ProgramFormEnum.Anxiety.ID === argsData.formId) {
        const anxietyQuiz = await this.anxietyQuizCalculateResult(
          this.quiz,
          JSON.parse(JSON.stringify(argsData.metadata)),
        );
        emailSubject = anxietyQuiz['testName'];
        emailMessage = `Thank you for given Test Result`;
        // emailMessage = `Thank you for given Test Result is
        //  MinScore ="${anxietyQuiz['score'][0].min_score}",
        //  MaxScore ="${anxietyQuiz['score'][0].max_score}",
        //  interpretation ="${anxietyQuiz['score'][0].interpretation}",
        //  Total Score ="${anxietyQuiz['score'][0]['score'].toString()}"`;
        // console.log(emailMessage);

        argsData.name = anxietyQuiz['testName'];
        argsData.score = anxietyQuiz['score'];
        await this.insertForm(argsData);
        console.log('Total Score:', anxietyQuiz);
      }
      if (ProgramFormEnum.Child_Intake.ID === argsData.formId) {
        argsData.name = ProgramFormEnum.Child_Intake.NAME;
        argsData.score = '0';
        emailSubject = ProgramFormEnum.Child_Intake.NAME;
        emailMessage = `Thank you for given test`;
        await this.insertForm(argsData);
      }
      if (ProgramFormEnum.PSC_Child.ID === argsData.formId) {
        const pscScore = await this.pscQuizResult(
          ProgramFormEnum.PSC_Child.NAME,
          argsData.metadata,
        );
        argsData.name = pscScore['testName'];
        argsData.score = pscScore['score'];
        emailSubject = pscScore['testName'];
        emailMessage = `Your Test Result is ${pscScore['result']}`;
        await this.insertForm(argsData);
      }
      if (ProgramFormEnum.PSC_Youth.ID === argsData.formId) {
        const pscScore = await this.pscQuizResult(
          ProgramFormEnum.PSC_Youth.NAME,
          argsData.metadata,
        );
        argsData.name = pscScore['testName'];
        argsData.score = pscScore['score'];
        emailSubject = pscScore['testName'];
        emailMessage = `Your Test Result is ${pscScore['result']}`;
        await this.insertForm(argsData);
      }

      const _dataEmail = {
        _table_name: 'public.action_users',
        _view: 'email',
        _column1: 'uid',
      };
      const DynamicResult = await this.utility.dynamicQuery(
        _dataEmail,
        argsData.uid.toString().trim(),
      );
      console.log(DynamicResult['data'][0]['email']);

      this.utility.sendEmail(
        DynamicResult['data'][0]['email'],
        emailSubject,
        JSON.stringify(emailMessage),
      );
      return emailMessage;
    } catch (ex) {
      return ex;
    }
  }

  async insertForm(argsData: ProgramDataArgs) {
    try {
      const insertResponse = await this.connection.query(
        `INSERT INTO public.p02_program_data
         (patient_uid,name, metadata, score, created_at,created_by,status)
         VALUES($1,$2,$3,$4,$5,$6,$7)`,
        [
          argsData.uid,
          argsData.name.toLowerCase().trim(),
          typeof argsData.metadata == 'string'
            ? JSON.parse(argsData.metadata)
            : argsData.metadata,
          typeof argsData.score == 'string'
            ? JSON.parse(argsData.score)
            : argsData.score,
          this.utility.getMomentUnix(),
          argsData.uid,
          1,
        ],
      );
      console.log(insertResponse);
    } catch (ex) {
      console.log(ex);
    }
  }

  async pscQuizResult(TestName: string, metadata: JSON): Promise<object> {
    try {
      let score = 0;
      const meta = JSON.parse(JSON.stringify(metadata));
      meta?.map((val) => {
        console.log('never', val['answer'].toLowerCase().toString() == 'never');
        if (val['answer'].toLowerCase().toString() == 'never') {
          score += this.pscAnswers[0].Never;
        }
        console.log('often', val['answer'].toLowerCase().toString() == 'often');
        if (val['answer'].toLowerCase().toString() == 'often') {
          score += this.pscAnswers[0].Often;
        }
        console.log(
          'sometimes',
          val['answer'].toLowerCase().toString() == 'sometimes',
        );
        if (val['answer'].toLowerCase().toString() == 'sometimes') {
          score += this.pscAnswers[0].Sometimes;
        }
        console.log(score);
        return val;
      });
      const result =
        score! >= 40 && score! <= 50
          ? '(You are Stressed)'
          : score! >= 51 && score! <= 70
          ? '(You are Highly Stressed)'
          : score! > 70
          ? '(You have Extreme Level of Anxiety)'
          : '(Your Mental Health is Fine)';
      console.log('total', score);
      console.log('result', result);
      return { score: score, testName: TestName, result: result };
    } catch (ex) {
      console.log(ex);
    }
  }

  async anxietyQuizCalculateResult(quiz, submittedAnswers): Promise<object> {
    let totalScore = 0;
    console.log(submittedAnswers);

    submittedAnswers.forEach((submittedAnswer) => {
      const matchingQuestion = quiz.find(
        (q) => q.question === submittedAnswer.question,
        console.log((q) => q.question === submittedAnswer.question),
      );
      console.log(matchingQuestion);

      if (matchingQuestion) {
        const matchingOption = matchingQuestion.options.find(
          (option) => option.text === submittedAnswer.answer,
        );
        console.log(matchingOption);

        if (matchingOption) {
          totalScore += matchingOption.score;
          console.log(totalScore);
        }
      }
    });
    const anxietyResult = this.score_ranges.filter((val) => {
      return totalScore >= val.min_score && totalScore <= val.max_score;
    });
    anxietyResult[0]['score'] = totalScore;
    console.log(anxietyResult);

    return {
      testName: 'Anxiety',
      score: anxietyResult,
    };
  }
}
