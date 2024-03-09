"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationModule = void 0;
const common_1 = require("@nestjs/common");
const actions_users_resolver_1 = require("./actions-users/actions-users.resolver");
const actions_users_service_1 = require("./actions-users/actions-users.service");
const shared_module_module_1 = require("../shared-module/shared-module.module");
const jwt_service_1 = require("./guards/jwt.service");
let AuthenticationModule = class AuthenticationModule {
};
AuthenticationModule = __decorate([
    (0, common_1.Module)({
        imports: [shared_module_module_1.SharedModuleModule],
        providers: [actions_users_resolver_1.ActionsUsersResolver, actions_users_service_1.ActionsUsersService, jwt_service_1.JwtService],
    })
], AuthenticationModule);
exports.AuthenticationModule = AuthenticationModule;
//# sourceMappingURL=authentication.module.js.map