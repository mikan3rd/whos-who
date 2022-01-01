import { registerEnumType } from '@nestjs/graphql';

export enum TicketUserLikeScalarFieldEnum {
    id = "id",
    ticketId = "ticketId",
    userId = "userId",
    createdAt = "createdAt",
    updatedAt = "updatedAt"
}


registerEnumType(TicketUserLikeScalarFieldEnum, { name: 'TicketUserLikeScalarFieldEnum', description: undefined })
