import { Injectable, UnauthorizedException } from '@nestjs/common';
import { GenericResponse } from 'src/shared-module/generic/generic';
import {
  GenericSuccessResponse,
  GenericErrorResponse,
} from 'src/shared-module/generic/response-helper';
import { DataSource, In } from 'typeorm';
import { CreateUserDto } from './dto/createUserDto';
import { Utility } from 'src/shared-module/generic/utility.class';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { AssessmentDto } from './dto/assessment.dto';
@Injectable()
export class ActionsUsersService {
  constructor(
    private readonly connection: DataSource,
    private readonly utility: Utility,
  ) {}

  async instituteRegistration(
    argsData: CreateUserDto,
  ): Promise<GenericResponse<string>> {
    try {
      const _dataEmail = {
        _table_name: 'public.ts01_institute',
        _column1: 'email',
      };
      const booleanResultEmail = await this.utility.existsOrNot(
        _dataEmail,
        argsData.email.toString().trim(),
      );
      const _dataPhone = {
        _table_name: 'public.ts01_institute',
        _column1: 'phone',
      };
      const booleanResultPhone = await this.utility.existsOrNot(
        _dataPhone,
        argsData.phone,
      );
      if (
        booleanResultPhone['status'] == true ||
        booleanResultEmail['status'] == true
      ) {
        return GenericErrorResponse(
          'This Institute already exist kindly login',
          '',
        );
      } else {
        const encryptPassword = await this.hashPassword(argsData.password);
        console.log(encryptPassword);
        const salt = 'saltOrRound';
        const instituteResponse = await this.connection.query(
          `INSERT INTO public.ts01_institute
            (name, email,password, salt, address, country, city, state, zip_code, status, phone)
            VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10,$11)`,
          [
            argsData.name,
            argsData.email,
            encryptPassword,
            salt,
            argsData.address,
            argsData.country,
            argsData.city,
            argsData.state,
            argsData.zip_code,
            1,
            argsData.phone,
          ],
        );
        console.log(instituteResponse);
        this.utility.sendEmail(
          argsData.email.toLowerCase().toString(),
          `Institute-Registeration`,
          `The Institute is ${argsData.name} Successfully! Registered`,
        );
        return GenericSuccessResponse(`Institute Successfully Registered!`);
      }
    } catch (ex) {
      return GenericErrorResponse(ex);
    }
  }

  async actionsUsersRegistration(
    argsData: CreateUserDto,
  ): Promise<GenericResponse<string>> {
    try {
      const _dataEmail = {
        _table_name: 'public.action_users',
        _column1: 'email',
        _column2: 'level',
      };
      const booleanResultEmail = await this.utility.existsOrNot(
        _dataEmail,
        argsData.email.toString().trim(),
        argsData.level.toString().trim(),
      );
      const _dataPhone = {
        _table_name: 'public.action_users',
        _column1: 'phone',
        _column2: 'level',
      };
      const booleanResultPhone = await this.utility.existsOrNot(
        _dataPhone,
        argsData.phone,
        argsData.level.toString().trim(),
      );
      console.log("boolean result", booleanResultEmail)
      console.log("boolean result", booleanResultPhone)
      if (
        booleanResultPhone['status'] == true ||
        booleanResultEmail['status'] == true
      ) {
        return GenericErrorResponse('This User already exist kindly login', '');
      } else {
        const encryptPassword = await this.hashPassword(argsData.password);
        const salt = 'saltOrRound';
        let level = undefined;
        if (argsData.level === 11) {
          const doctorResponse = await this.connection.query(
            `INSERT INTO public.action_users
             (name, dob, email, password, salt, gender, status, phone,level)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
            [
              argsData.name,
              argsData.dob,
              argsData.email,
              encryptPassword,
              salt,
              argsData.gender,
              1,
              argsData.phone,
              argsData.level,
            ],
          );
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          level = 'Doctor';
        }
        if (argsData.level === 12) {
          const _dataPhone = {
            _table_name: 'public.ts01_institute',
            _column1: 'name',
          };
          const booleanResultPhone = await this.utility.existsOrNot(
            _dataPhone,
            argsData.institute_name,
          );
          if (booleanResultPhone['status'] === true) {
            const teacherResponse = await this.connection.query(
              `INSERT INTO public.action_users
                    (name, dob, email,password, salt, gender, address, country, city, state, zip_code,
                    status, phone, level, institute_uid)
                    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9,$10,$11,$12,$13,$14,$15)`,
              [
                argsData.name.toString().trim(),
                argsData.dob,
                argsData.email.toString().trim(),
                encryptPassword,
                salt,
                argsData.gender,
                argsData.address.toString().trim(),
                argsData.country.toString().trim(),
                argsData.city.toString().trim(),
                argsData.state.toString().trim(),
                argsData.zip_code,
                1,
                argsData.phone,
                argsData.level,
                booleanResultPhone['data']['uid'],
              ],
            );
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            level = 'Teacher';
          }
        }
        if (argsData.level === 13) {
          const patientResponse = await this.connection.query(
            `INSERT INTO public.action_users 
                    (name,dob,email,password,
                    salt,gender,address,
                    country,city,state,
                    zip_code, status,phone,
                    level)
                    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9,$10,$11,$12,$13,$14)`,
            [
              argsData.name.toString().trim(),
              argsData.dob,
              argsData.email.toString().trim(),
              encryptPassword,
              salt,
              argsData.gender,
              argsData.address.toString().trim(),
              argsData.country.toString().trim(),
              argsData.city.toString().trim(),
              argsData.state.toString().trim(),
              argsData.zip_code,
              1,
              argsData.phone,
              argsData.level,
            ],
          );
          console.log(patientResponse);
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          level = 'Patient';
        }
        this.utility.sendEmail(
          argsData.email.toLowerCase().toString(),
          `Registeration`,
          `The User ${level} Successfully! Registered`,
        );
        return GenericSuccessResponse(`User ${level} Successfully Registered!`);
      }
    } catch (ex) {
      return GenericErrorResponse(ex);
    }
  }

  async hashPassword(password: string): Promise<string> {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);
    return hash;
  }

  async passwordMatcher(password: string, hash: string): Promise<boolean> {
    const isMatch = await bcrypt.compare(password, hash);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid username or password');
    }
    return isMatch;
  }

  async login(argsData: LoginDto): Promise<object> {
    try {
      if ([12, 11, 13].includes(argsData.level)) {
        const _dataEmail = {
          _table_name: 'public.action_users',
          _column1: 'email',
          _column2: 'level',
        };
        const booleanResultEmail = await this.utility.existsOrNot(
          _dataEmail,
          argsData.email.toString().trim(),
          argsData.level.toString().trim(),
        );
        if (booleanResultEmail['status'] == true) {
          const [response, _1] = await this.connection.query(
            'SELECT password,name,extract(year FROM age(DOB)) AS age FROM public.action_users where uid=$1',
            [booleanResultEmail['data']['uid']],
          );
          const matchPassword = await this.passwordMatcher(
            argsData.password,
            response['password'],
          );
          const res = {
            uid: booleanResultEmail['data']['uid'],
            role: argsData.level,
            name: response['name'].toString().trim(),
            age: response['age'].toString().trim(),
            verified: matchPassword,
            message: 'login Successfully',
            statusCode: '200',
          };
          return matchPassword === true
            ? res
            : {
                res:
                  ((res['message'] = 'Invalid Credentials'),
                  (res['statusCode'] = '401')),
              };
        }
        const error = {
          message: 'This User is not registered kindly registered User',
          statusCode: '404',
        };
        return error;
      }
      if (argsData.level === 0) {
        const _dataEmail = {
          _table_name: 'public.ts01_institute',
          _column1: 'email',
        };
        const booleanResultEmail = await this.utility.existsOrNot(
          _dataEmail,
          argsData.email.toString().trim(),
        );
        if (booleanResultEmail['status'] == true) {
          const [response, _1] = await this.connection.query(
            'SELECT password,name FROM public.ts01_institute where uid=$1',
            [booleanResultEmail['data']['uid']],
          );
          const matchPassword = await this.passwordMatcher(
            argsData.password,
            response['password'],
          );
          const res = {
            uid: booleanResultEmail['data']['uid'],
            role: argsData.level,
            name: response['name'],
            verified: matchPassword,
            message: 'login Successfully',
            statusCode: '200',
          };
          return matchPassword === true
            ? res
            : {
                res:
                  ((res['message'] = 'Invalid Credentials'),
                  (res['statusCode'] = '401')),
              };
        }
        const error = {
          message: 'This User is not registered kindly registered Institute',
          statusCode: '404',
        };
        return error;
      }
    } catch (ex) {
      console.log('login', ex);
      return ex;
    }
  }

  // async forgetPassword(argsData: ForgetPasswordDto): Promise<object> {
  //   try {
  //     if ([12, 11, 13].includes(argsData.level)) {
  //       const _dataEmail = {
  //         _table_name: 'public.action_users',
  //         _column1: 'email',
  //         _column2: 'level',
  //       };
  //       const booleanResultEmail = await this.utility.existsOrNot(
  //         _dataEmail,
  //         argsData.email.toString().trim(),
  //         argsData.level.toString().trim(),
  //       );
  //       if (booleanResultEmail['status'] == true) {
  //         const [response, _1] = await this.connection.query(
  //           'SELECT password,name FROM public.action_users where uid=$1',
  //           [booleanResultEmail['data']['uid']],
  //         );
  //         const matchPassword = await this.passwordMatcher(
  //           argsData.password,
  //           response['password'],
  //         );
  //         const res = {
  //           uid: booleanResultEmail['data']['uid'],
  //           role: argsData.level,
  //           name: response['name'].toString().trim(),
  //           verified: matchPassword,
  //           message: 'login Successfully',
  //           statusCode: '200',
  //         };
  //         return matchPassword === true
  //           ? res
  //           : {
  //               res:
  //                 ((res['message'] = 'Invalid Credentials'),
  //                 (res['statusCode'] = '401')),
  //             };
  //       }
  //       const error = {
  //         message: 'This User is not registered kindly registered User',
  //         statusCode: '404',
  //       };
  //       return error;
  //     }
  // if (argsData.level === 0) {
  //   const _dataEmail = {
  //     _table_name: 'public.ts01_institute',
  //     _column1: 'email',
  //   };
  //   const booleanResultEmail = await this.utility.existsOrNot(
  //     _dataEmail,
  //     argsData.email.toString().trim(),
  //   );
  //   if (booleanResultEmail['status'] == true) {
  //     const [response, _1] = await this.connection.query(
  //       'SELECT password,name FROM public.ts01_institute where uid=$1',
  //       [booleanResultEmail['data']['uid']],
  //     );
  //     const matchPassword = await this.passwordMatcher(
  //       argsData.password,
  //       response['password'],
  //     );
  //     const res = {
  //       uid: booleanResultEmail['data']['uid'],
  //       role: argsData.level,
  //       name: response['name'],
  //       verified: matchPassword,
  //       message: 'login Successfully',
  //       statusCode: '200',
  //     };
  //     return matchPassword === true
  //       ? res
  //       : {
  //           res:
  //             ((res['message'] = 'Invalid Credentials'),
  //             (res['statusCode'] = '401')),
  //         };
  //   }
  //   const error = {
  //     message: 'This User is not registered kindly registered Institute',
  //     statusCode: '404',
  //   };
  //   return error;
  // }
  //   } catch (ex) {
  //     console.log('login', ex);
  //     return ex;
  //   }
  // }

  async assessmentDictionary(argsData: AssessmentDto): Promise<object> {
    try {
      const _dataEmail = {
        _table_name: 'public.action_users',
        _view: 'extract(year FROM age(DOB)) AS age',
        _column1: 'uid',
        _column2: 'level',
      };
      const DynamicResult = await this.utility.dynamicQuery(
        _dataEmail,
        argsData.uid.toString().trim(),
        argsData.role.toString().trim(),
      );
      console.log('DynamicResult', DynamicResult['data'][0]['age']);

      if (DynamicResult['status'] == true) {
        const _dataEmail = {
          _table_name: 'public.assessments',
          _view: 'form_name, metadata',
          _column1: 'form_name',
          _limit: false,
          _in: false,
        };
        if (argsData.role === 13) {
          if (
            parseInt(DynamicResult['data'][0]['age']) >= 6 &&
            parseInt(DynamicResult['data'][0]['age']) <= 11
          ) {
            const DynamicResult = await this.utility.dynamicQuery(
              _dataEmail,
              'psc-child',
            );
            DynamicResult['data'] = DynamicResult['data'].map(
              (valueMetadata) => {
                valueMetadata['metadata'] =
                  typeof valueMetadata['metadata'] == 'string'
                    ? JSON.parse(valueMetadata['metadata'])
                    : valueMetadata['metadata'];
                return valueMetadata;
              },
            );
            console.log(DynamicResult['data']);
            return DynamicResult['status'] == true ? DynamicResult['data'] : {};
          }
          if (parseInt(DynamicResult['data'][0]['age']) >= 12) {
            const DynamicResult = await this.utility.dynamicQuery(
              _dataEmail,
              'psc-youth',
            );
            DynamicResult['data'] = DynamicResult['data'].map(
              (valueMetadata) => {
                valueMetadata['metadata'] =
                  typeof valueMetadata['metadata'] == 'string'
                    ? JSON.parse(valueMetadata['metadata'])
                    : valueMetadata['metadata'];
                return valueMetadata;
              },
            );
            console.log(DynamicResult['data']);
            return DynamicResult['status'] == true ? DynamicResult['data'] : {};
          }
        }
        return {};
      }
    } catch (ex) {
      return ex;
    }
  }
  async Dictionary(): Promise<object> {
    try {
      const _dataEmail = {
        _table_name: 'public.terminologies',
        _view: 'id,group_name,code,name',
      };
      const response = await this.utility.dynamicQuery(_dataEmail);
      return response['data'];
    } catch (ex) {
      return ex;
    }
  }
  // async deletePatient(email: string): Promise<GenericResponse<string>> {
  //   try {
  //     const patient = await this.connection.query(
  //       'DELETE FROM public.action_users WHERE email = $1 AND level = 13 RETURNING *',
  //       [email],
  //     );
  
  //     if (patient && patient.length > 0) {
  //       // Patient deleted successfully
  //       return GenericSuccessResponse('Patient deleted successfully');
  //     } else {
  //       // Patient not found or not deleted
  //       return GenericErrorResponse('Patient not found or failed to delete', '');
  //     }
  //   } catch (ex) {
  //     // Handle exceptions
  //     return GenericErrorResponse(ex);
  //   }
  // }  
}
