"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionsUsersResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const actions_users_service_1 = require("./actions-users.service");
const createUserDto_1 = require("./dto/createUserDto");
const actions_users_model_1 = require("./dto/actions-users.model/actions-users.model");
const response_helper_1 = require("../../shared-module/generic/response-helper");
const login_dto_1 = require("./dto/login.dto");
const auth_guard_guard_1 = require("../guards/auth-guard.guard");
const common_1 = require("@nestjs/common");
const jwt_service_1 = require("../guards/jwt.service");
const jwt_guard_1 = require("../guards/jwt.guard");
const roles_guard_guard_1 = require("../../shared-module/roles-guard/roles-guard.guard");
const users_enum_1 = require("./dto/users.enum");
const generic_model_type_1 = require("../../shared-module/generic/generic-model-type");
let ActionsUsersResolver = class ActionsUsersResolver {
    constructor(service, jwtService) {
        this.service = service;
        this.jwtService = jwtService;
    }
    async actionsUsersRegistration(rawData) {
        try {
            return await this.service.actionsUsersRegistration(rawData);
        }
        catch (ex) {
            return (0, response_helper_1.GenericErrorResponse)(ex);
        }
    }
    async instituteRegistration(rawData) {
        try {
            return await this.service.instituteRegistration(rawData);
        }
        catch (ex) {
            return (0, response_helper_1.GenericErrorResponse)(ex);
        }
    }
    async login(rawData, data) {
        try {
            delete data['verified'];
            delete data['message'];
            delete data['statusCode'];
            const dictionary = await this.service.Dictionary();
            const response = {
                name: data['name'],
                age: data['age'],
                uid: data['uid'],
                token: await this.jwtService.generateToken(data),
                dictionary: dictionary,
                assessment: await this.service.assessmentDictionary(data),
            };
            return (0, response_helper_1.GenericSuccessResponse)(JSON.parse(JSON.stringify(response)));
        }
        catch (ex) {
            return (0, response_helper_1.GenericErrorResponse)(ex);
        }
    }
    async dictionary(data) {
        try {
            const assessment = await this.service.assessmentDictionary(data);
            const dictionary = await this.service.Dictionary();
            const response = {
                dictionary: dictionary,
                assessment: assessment,
            };
            return (0, response_helper_1.GenericSuccessResponse)(JSON.parse(JSON.stringify(response)));
        }
        catch (ex) {
            return (0, response_helper_1.GenericErrorResponse)(ex);
        }
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => actions_users_model_1.ActionsUsersModel, { name: 'actionsUsersRegistration' }),
    __param(0, (0, graphql_1.Args)('rawData')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createUserDto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], ActionsUsersResolver.prototype, "actionsUsersRegistration", null);
__decorate([
    (0, graphql_1.Mutation)(() => actions_users_model_1.ActionsUsersModel, { name: 'instituteRegistration' }),
    __param(0, (0, graphql_1.Args)('rawData')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createUserDto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], ActionsUsersResolver.prototype, "instituteRegistration", null);
__decorate([
    (0, graphql_1.Query)(() => actions_users_model_1.ActionsUsersLoginModel, { name: 'login' }),
    (0, common_1.UseGuards)(auth_guard_guard_1.AuthGuardGuard),
    __param(0, (0, graphql_1.Args)('rawData')),
    __param(1, (0, graphql_1.Context)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto, Object]),
    __metadata("design:returntype", Promise)
], ActionsUsersResolver.prototype, "login", null);
__decorate([
    (0, graphql_1.Query)(() => generic_model_type_1.SuccessJSONResponse, { name: 'dictionary' }),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard, new roles_guard_guard_1.RolesGuardGuard(users_enum_1.Level.Patient)),
    __param(0, (0, graphql_1.Context)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ActionsUsersResolver.prototype, "dictionary", null);
ActionsUsersResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [actions_users_service_1.ActionsUsersService,
        jwt_service_1.JwtService])
], ActionsUsersResolver);
exports.ActionsUsersResolver = ActionsUsersResolver;
//# sourceMappingURL=actions-users.resolver.js.map