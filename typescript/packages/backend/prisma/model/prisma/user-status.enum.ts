import { registerEnumType } from '@nestjs/graphql';

export enum UserStatus {
    ACTIVE = "ACTIVE",
    DISABLED = "DISABLED"
}


registerEnumType(UserStatus, { name: 'UserStatus', description: undefined })
