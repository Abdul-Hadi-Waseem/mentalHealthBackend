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
exports.ErrorResponse = exports.SuccessJSONResponse = exports.SuccessResponse = void 0;
const graphql_1 = require("@nestjs/graphql");
const generic_1 = require("./generic");
const graphql_type_json_1 = require("graphql-type-json");
let SuccessResponse = class SuccessResponse {
};
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    __metadata("design:type", Boolean)
], SuccessResponse.prototype, "success", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], SuccessResponse.prototype, "error", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], SuccessResponse.prototype, "message", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], SuccessResponse.prototype, "data", void 0);
SuccessResponse = __decorate([
    (0, graphql_1.ObjectType)({ implements: generic_1.GenericGraphQlResponse })
], SuccessResponse);
exports.SuccessResponse = SuccessResponse;
let SuccessJSONResponse = class SuccessJSONResponse {
};
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    __metadata("design:type", Boolean)
], SuccessJSONResponse.prototype, "success", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], SuccessJSONResponse.prototype, "error", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], SuccessJSONResponse.prototype, "message", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_type_json_1.default),
    __metadata("design:type", Object)
], SuccessJSONResponse.prototype, "data", void 0);
SuccessJSONResponse = __decorate([
    (0, graphql_1.ObjectType)({ implements: generic_1.GenericGraphQlResponse })
], SuccessJSONResponse);
exports.SuccessJSONResponse = SuccessJSONResponse;
let ErrorResponse = class ErrorResponse {
};
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    __metadata("design:type", Boolean)
], ErrorResponse.prototype, "success", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], ErrorResponse.prototype, "error", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], ErrorResponse.prototype, "message", void 0);
ErrorResponse = __decorate([
    (0, graphql_1.ObjectType)()
], ErrorResponse);
exports.ErrorResponse = ErrorResponse;
//# sourceMappingURL=generic-model-type.js.map