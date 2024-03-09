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
exports.DoctorResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const doctor_schema_1 = require("./schema/doctor.schema");
const doctor_service_1 = require("./doctor.service");
const add_doctor_args_1 = require("./args/add.doctor.args");
let DoctorResolver = class DoctorResolver {
    constructor(doctorService) {
        this.doctorService = doctorService;
    }
    getAllDoctors() {
        return this.doctorService.findAllBooks();
    }
    addDocotorProfile(addDoctorArgs) {
        return this.doctorService.addDoctorProfile(addDoctorArgs);
    }
};
__decorate([
    (0, graphql_1.Query)(returns => [doctor_schema_1.Doctor], { name: "doctors" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], DoctorResolver.prototype, "getAllDoctors", null);
__decorate([
    (0, graphql_1.Mutation)(returns => String, { name: "addDoctorProfile" }),
    __param(0, (0, graphql_1.Args)("addDoctorArgs")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [add_doctor_args_1.AddDoctorArgs]),
    __metadata("design:returntype", void 0)
], DoctorResolver.prototype, "addDocotorProfile", null);
DoctorResolver = __decorate([
    (0, graphql_1.Resolver)(of => doctor_schema_1.Doctor),
    __metadata("design:paramtypes", [doctor_service_1.DoctorService])
], DoctorResolver);
exports.DoctorResolver = DoctorResolver;
//# sourceMappingURL=doctor.resolver.js.map