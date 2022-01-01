import { registerEnumType } from '@nestjs/graphql';

export enum RequestedTicketScalarFieldEnum {
    id = "id",
    userId = "userId",
    uploadedImageId = "uploadedImageId",
    externalImageId = "externalImageId",
    personId = "personId",
    createdAt = "createdAt",
    updatedAt = "updatedAt"
}


registerEnumType(RequestedTicketScalarFieldEnum, { name: 'RequestedTicketScalarFieldEnum', description: undefined })
