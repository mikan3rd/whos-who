import { registerEnumType } from '@nestjs/graphql';

export enum GoogleAuthCredentialScalarFieldEnum {
    id = "id",
    userId = "userId",
    uid = "uid",
    displayName = "displayName",
    photoUrl = "photoUrl",
    accessToken = "accessToken",
    refreshToken = "refreshToken",
    email = "email",
    createdAt = "createdAt",
    updatedAt = "updatedAt"
}


registerEnumType(GoogleAuthCredentialScalarFieldEnum, { name: 'GoogleAuthCredentialScalarFieldEnum', description: undefined })
