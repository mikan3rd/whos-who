import { registerEnumType } from '@nestjs/graphql';

export enum UserRole {
    NONE = "NONE",
    MEMBER = "MEMBER",
    ADMIN = "ADMIN"
}


registerEnumType(UserRole, { name: 'UserRole', description: undefined })
