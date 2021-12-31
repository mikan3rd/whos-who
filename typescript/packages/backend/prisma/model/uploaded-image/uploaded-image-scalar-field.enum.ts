import { registerEnumType } from '@nestjs/graphql';

export enum UploadedImageScalarFieldEnum {
    id = "id",
    bucketName = "bucketName",
    filePath = "filePath",
    createdAt = "createdAt",
    updatedAt = "updatedAt"
}


registerEnumType(UploadedImageScalarFieldEnum, { name: 'UploadedImageScalarFieldEnum', description: undefined })
