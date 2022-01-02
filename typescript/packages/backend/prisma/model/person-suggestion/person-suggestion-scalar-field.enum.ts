import { registerEnumType } from '@nestjs/graphql';

export enum PersonSuggestionScalarFieldEnum {
    id = "id",
    ticketId = "ticketId",
    personId = "personId",
    userId = "userId",
    createdAt = "createdAt",
    updatedAt = "updatedAt"
}


registerEnumType(PersonSuggestionScalarFieldEnum, { name: 'PersonSuggestionScalarFieldEnum', description: undefined })
