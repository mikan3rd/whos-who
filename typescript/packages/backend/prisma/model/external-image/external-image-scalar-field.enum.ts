import { registerEnumType } from '@nestjs/graphql';

export enum ExternalImageScalarFieldEnum {
    id = "id",
    url = "url",
    statusCode = "statusCode",
    createdAt = "createdAt",
    updatedAt = "updatedAt"
}


registerEnumType(ExternalImageScalarFieldEnum, { name: 'ExternalImageScalarFieldEnum', description: undefined })
