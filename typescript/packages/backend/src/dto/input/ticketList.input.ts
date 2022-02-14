import { Field, InputType, registerEnumType } from "@nestjs/graphql";

import { PaginationWithSortOrderInput } from "@/dto/input/pagination.input";

export enum SortKey {
  createdAt = "createdAt",
  ticketUserLikes = "ticketUserLikes",
}
registerEnumType(SortKey, { name: "SortKey" });

@InputType()
export class TicketListInput extends PaginationWithSortOrderInput {
  @Field((type) => SortKey, { nullable: true })
  sortKey?: SortKey;

  @Field({ nullable: true })
  filterByAnswered?: boolean;
}
