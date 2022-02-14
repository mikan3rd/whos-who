import { Field, ObjectType } from "@nestjs/graphql";

import { Ticket } from "@prisma-model/ticket/ticket.model";

@ObjectType()
export class TopPageDataOutput {
  @Field((type) => [Ticket])
  ticketsOrderByCreatedAt!: Ticket[];

  @Field((type) => [Ticket])
  ticketsOrderByLike!: Ticket[];
}
