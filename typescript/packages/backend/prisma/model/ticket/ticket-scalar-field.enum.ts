import { registerEnumType } from '@nestjs/graphql';

export enum TicketScalarFieldEnum {
    id = "id",
    userId = "userId",
    uploadedImageId = "uploadedImageId",
    externalImageId = "externalImageId",
    personId = "personId",
    createdAt = "createdAt",
    updatedAt = "updatedAt"
}


registerEnumType(TicketScalarFieldEnum, { name: 'TicketScalarFieldEnum', description: undefined })
