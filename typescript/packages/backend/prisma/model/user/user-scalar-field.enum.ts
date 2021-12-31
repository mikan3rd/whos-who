import { registerEnumType } from '@nestjs/graphql';

export enum UserScalarFieldEnum {
    uid = "uid",
    displayName = "displayName",
    email = "email",
    role = "role",
    createdAt = "createdAt",
    updatedAt = "updatedAt"
}


registerEnumType(UserScalarFieldEnum, { name: 'UserScalarFieldEnum', description: undefined })
