import { Field, InputType, Int } from "@nestjs/graphql";

import { SortOrder } from "@/dto/input/sortOrder.input";

@InputType()
export class PaginationInput {
  @Field((type) => Int)
  take!: number;

  @Field((type) => Int, { nullable: true })
  page?: number;
}

@InputType()
export class PaginationWithSortOrderInput extends PaginationInput {
  @Field((type) => SortOrder, { nullable: true })
  sortOrder?: SortOrder;
}
