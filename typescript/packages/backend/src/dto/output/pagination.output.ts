import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class PaginationOutput {
  @Field((type) => Int)
  totalCount!: number;
}
