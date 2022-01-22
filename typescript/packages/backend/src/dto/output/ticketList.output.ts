import { Field, ObjectType } from "@nestjs/graphql";

import { PaginationOutput } from "@/dto/output/pagination.output";
import { Ticket } from "@prisma-model/ticket/ticket.model";

@ObjectType()
export class TicketListOutput extends PaginationOutput {
  @Field((type) => [Ticket])
  tickets!: Ticket[];
}
