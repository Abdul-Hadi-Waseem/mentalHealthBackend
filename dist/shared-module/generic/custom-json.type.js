"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JSONScalar = void 0;
const graphql_1 = require("@nestjs/graphql");
const graphql_2 = require("graphql");
let JSONScalar = class JSONScalar {
    constructor() {
        this.description = 'JSON custom scalar type';
    }
    parseValue(value) {
        return value;
    }
    serialize(value) {
        return value;
    }
    parseLiteral(ast) {
        switch (ast.kind) {
            case graphql_2.Kind.STRING:
            case graphql_2.Kind.BOOLEAN:
                return ast.value;
            case graphql_2.Kind.INT:
            case graphql_2.Kind.FLOAT:
                return parseFloat(ast.value);
            case graphql_2.Kind.OBJECT:
                const objValue = Object.create(null);
                ast.fields.forEach((field) => {
                    objValue[field.name.value] = this.parseLiteral(field.value);
                });
                return objValue;
            case graphql_2.Kind.LIST:
                return ast.values.map((n) => this.parseLiteral(n));
            default:
                return null;
        }
    }
};
JSONScalar = __decorate([
    (0, graphql_1.Scalar)('JSON', () => JSON)
], JSONScalar);
exports.JSONScalar = JSONScalar;
//# sourceMappingURL=custom-json.type.js.map