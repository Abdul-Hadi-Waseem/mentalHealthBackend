import { CustomScalar, Scalar } from '@nestjs/graphql';
import { Kind, ValueNode } from 'graphql';

@Scalar('JSON', () => JSON)
export class JSONScalar implements CustomScalar<any, any> {
  description = 'JSON custom scalar type';

  parseValue(value: any): any {
    return value; // Value from the client
  }

  serialize(value: any): any {
    return value; // Value sent to the client
  }

  parseLiteral(ast: ValueNode): any {
    switch (ast.kind) {
      case Kind.STRING:
      case Kind.BOOLEAN:
        return ast.value;
      case Kind.INT:
      case Kind.FLOAT:
        return parseFloat(ast.value);
      case Kind.OBJECT:
        const objValue = Object.create(null);
        ast.fields.forEach((field) => {
          objValue[field.name.value] = this.parseLiteral(field.value);
        });
        return objValue;
      case Kind.LIST:
        return ast.values.map((n) => this.parseLiteral(n));
      default:
        return null;
    }
  }
}
