import { registerEnumType } from '@nestjs/graphql';

export enum PersonSuggestionLikeScalarFieldEnum {
    id = "id",
    ticketId = "ticketId",
    personSuggestionId = "personSuggestionId",
    userId = "userId",
    createdAt = "createdAt",
    updatedAt = "updatedAt"
}


registerEnumType(PersonSuggestionLikeScalarFieldEnum, { name: 'PersonSuggestionLikeScalarFieldEnum', description: undefined })
