"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SharedModuleModule = void 0;
const common_1 = require("@nestjs/common");
const generic_model_type_1 = require("./generic/generic-model-type");
const typeorm_1 = require("@nestjs/typeorm");
const utility_class_1 = require("./generic/utility.class");
const mailer_1 = require("@nestjs-modules/mailer");
const dotenv = require("dotenv");
dotenv.config();
let SharedModuleModule = class SharedModuleModule {
};
SharedModuleModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: "139.99.28.47",
                port: 5432,
                username: "postgres",
                password: "Mental@9252411",
                database: "mental_health_db",
                logging: true,
                synchronize: false,
            }),
            mailer_1.MailerModule.forRoot({
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
        providers: [generic_model_type_1.SuccessResponse, generic_model_type_1.ErrorResponse, utility_class_1.Utility],
        exports: [generic_model_type_1.SuccessResponse, generic_model_type_1.ErrorResponse, utility_class_1.Utility],
    })
], SharedModuleModule);
exports.SharedModuleModule = SharedModuleModule;
//# sourceMappingURL=shared-module.module.js.map