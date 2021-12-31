import { CustomScalar, Scalar } from "@nestjs/graphql";
import { Kind, ValueNode } from "graphql";

@Scalar("BigInt")
export class BigIntScalar implements CustomScalar<string, BigInt> {
  description = "BigInt custom scalar type";

  serialize(value: BigInt) {
    return value.toString(); // value sent to the client
  }

  parseValue(value: number) {
    return BigInt(value); // value from the client
  }

  parseLiteral(ast: ValueNode) {
    if (ast.kind === Kind.INT) {
      return BigInt(ast.value);
    }
    throw Error("parseLiteral");
  }
}
