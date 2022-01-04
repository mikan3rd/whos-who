import { registerEnumType } from '@nestjs/graphql';

export enum UploadedImageScalarFieldEnum {
    id = "id",
    bucketName = "bucketName",
    fileName = "fileName",
    url = "url",
    createdAt = "createdAt",
    updatedAt = "updatedAt"
}


registerEnumType(UploadedImageScalarFieldEnum, { name: 'UploadedImageScalarFieldEnum', description: undefined })
