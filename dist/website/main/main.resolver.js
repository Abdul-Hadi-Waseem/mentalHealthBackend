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
exports.MainResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const contact_us_dto_1 = require("../dto/contact-us.dto");
const main_service_1 = require("./main.service");
let MainResolver = class MainResolver {
    constructor(service) {
        this.service = service;
    }
    async contactUs(rawData) {
        try {
            const response = await this.service.contactUSInsert(rawData);
            return response;
        }
        catch (ex) {
            return ex;
        }
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => String, { name: 'contactUs' }),
    __param(0, (0, graphql_1.Args)('rawData')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [contact_us_dto_1.ContactUsArgs]),
    __metadata("design:returntype", Promise)
], MainResolver.prototype, "contactUs", null);
MainResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [main_service_1.MainService])
], MainResolver);
exports.MainResolver = MainResolver;
//# sourceMappingURL=main.resolver.js.map