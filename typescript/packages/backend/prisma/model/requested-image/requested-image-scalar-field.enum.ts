import { registerEnumType } from '@nestjs/graphql';

export enum RequestedImageScalarFieldEnum {
    id = "id",
    userId = "userId",
    uploadedImageId = "uploadedImageId",
    externalImageId = "externalImageId",
    personId = "personId",
    createdAt = "createdAt",
    updatedAt = "updatedAt"
}


registerEnumType(RequestedImageScalarFieldEnum, { name: 'RequestedImageScalarFieldEnum', description: undefined })
