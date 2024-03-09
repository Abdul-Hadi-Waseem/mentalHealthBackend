"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_resolver_1 = require("./app.resolver");
const app_service_1 = require("./app.service");
const teacher_module_1 = require("./teacher/teacher.module");
const patient_module_1 = require("./patient/patient.module");
const institute_module_1 = require("./institute/institute.module");
const doctor_module_1 = require("./doctor/doctor.module");
const payment_module_1 = require("./payment/payment.module");
const authentication_module_1 = require("./authentication/authentication.module");
const website_module_1 = require("./website/website.module");
const shared_module_module_1 = require("./shared-module/shared-module.module");
const apollo_1 = require("@nestjs/apollo");
const graphql_1 = require("@nestjs/graphql");
const path_1 = require("path");
const graphql_type_json_1 = require("graphql-type-json");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            teacher_module_1.TeacherModule,
            patient_module_1.PatientModule,
            institute_module_1.InstituteModule,
            doctor_module_1.DoctorProfileModule,
            payment_module_1.PaymentModule,
            authentication_module_1.AuthenticationModule,
            website_module_1.WebsiteModule,
            shared_module_module_1.SharedModuleModule,
            graphql_1.GraphQLModule.forRoot({
                driver: apollo_1.ApolloDriver,
                playground: true,
                autoSchemaFile: (0, path_1.join)(process.cwd(), 'src/schema.graphql'),
                resolvers: { JSON: graphql_type_json_1.default },
                definitions: {
                    path: (0, path_1.join)(process.cwd(), 'src/graphql.ts'),
                },
            }),
        ],
        providers: [app_service_1.AppService, app_resolver_1.AppResolver],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map