import { registerEnumType } from '@nestjs/graphql';

export enum UserRole {
    NONE = "NONE",
    ADMIN = "ADMIN"
}


registerEnumType(UserRole, { name: 'UserRole', description: undefined })
