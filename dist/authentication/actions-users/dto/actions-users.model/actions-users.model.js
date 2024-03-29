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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionsUsersLoginModel = exports.ActionsUsersModel = void 0;
const graphql_1 = require("@nestjs/graphql");
const graphql_type_json_1 = require("graphql-type-json");
const generic_1 = require("../../../../shared-module/generic/generic");
let ActionsUsersModel = class ActionsUsersModel {
};
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    __metadata("design:type", Boolean)
], ActionsUsersModel.prototype, "success", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], ActionsUsersModel.prototype, "error", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], ActionsUsersModel.prototype, "message", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], ActionsUsersModel.prototype, "data", void 0);
ActionsUsersModel = __decorate([
    (0, graphql_1.ObjectType)({ implements: generic_1.GenericGraphQlResponse })
], ActionsUsersModel);
exports.ActionsUsersModel = ActionsUsersModel;
let ActionsUsersLoginModel = class ActionsUsersLoginModel {
};
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    __metadata("design:type", Boolean)
], ActionsUsersLoginModel.prototype, "success", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], ActionsUsersLoginModel.prototype, "error", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], ActionsUsersLoginModel.prototype, "message", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_type_json_1.default),
    __metadata("design:type", Object)
], ActionsUsersLoginModel.prototype, "data", void 0);
ActionsUsersLoginModel = __decorate([
    (0, graphql_1.ObjectType)({ implements: generic_1.GenericGraphQlResponse })
], ActionsUsersLoginModel);
exports.ActionsUsersLoginModel = ActionsUsersLoginModel;
//# sourceMappingURL=actions-users.model.js.map