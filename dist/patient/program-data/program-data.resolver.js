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
exports.ProgramDataResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const generic_model_type_1 = require("../../shared-module/generic/generic-model-type");
const program_dto_1 = require("./dto/program.dto");
const program_data_service_1 = require("./program-data.service");
const common_1 = require("@nestjs/common");
const users_enum_1 = require("../../authentication/actions-users/dto/users.enum");
const jwt_guard_1 = require("../../authentication/guards/jwt.guard");
const roles_guard_guard_1 = require("../../shared-module/roles-guard/roles-guard.guard");
const response_helper_1 = require("../../shared-module/generic/response-helper");
let ProgramDataResolver = class ProgramDataResolver {
    constructor(service) {
        this.service = service;
    }
    async programform(argsData, data) {
        try {
            const { uid } = data;
            argsData.uid = uid;
            const res = await this.service.programData(argsData);
            return (0, response_helper_1.GenericSuccessResponse)(JSON.parse(JSON.stringify(res)));
        }
        catch (ex) {
            return ex;
        }
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => generic_model_type_1.SuccessJSONResponse),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard, new roles_guard_guard_1.RolesGuardGuard(users_enum_1.Level.Patient)),
    __param(0, (0, graphql_1.Args)('argsData')),
    __param(1, (0, graphql_1.Context)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [program_dto_1.ProgramDataArgs, Object]),
    __metadata("design:returntype", Promise)
], ProgramDataResolver.prototype, "programform", null);
ProgramDataResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [program_data_service_1.ProgramDataService])
], ProgramDataResolver);
exports.ProgramDataResolver = ProgramDataResolver;
//# sourceMappingURL=program-data.resolver.js.map