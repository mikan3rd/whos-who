import { registerEnumType } from '@nestjs/graphql';

export enum UserScalarFieldEnum {
    id = "id",
    authUid = "authUid",
    displayName = "displayName",
    photoUrl = "photoUrl",
    email = "email",
    role = "role",
    status = "status",
    point = "point",
    createdAt = "createdAt",
    updatedAt = "updatedAt"
}


registerEnumType(UserScalarFieldEnum, { name: 'UserScalarFieldEnum', description: undefined })
