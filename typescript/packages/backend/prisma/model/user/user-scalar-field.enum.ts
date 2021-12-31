import { registerEnumType } from '@nestjs/graphql';

export enum UserScalarFieldEnum {
    id = "id",
    displayName = "displayName",
    email = "email",
    role = "role",
    verified = "verified",
    createdAt = "createdAt",
    updatedAt = "updatedAt"
}


registerEnumType(UserScalarFieldEnum, { name: 'UserScalarFieldEnum', description: undefined })
