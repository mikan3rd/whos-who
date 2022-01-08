import { registerEnumType } from '@nestjs/graphql';

export enum TwitterAuthCredentialScalarFieldEnum {
    id = "id",
    userId = "userId",
    uid = "uid",
    displayName = "displayName",
    screenName = "screenName",
    photoUrl = "photoUrl",
    accessToken = "accessToken",
    refreshToken = "refreshToken",
    oauthAccessToken = "oauthAccessToken",
    oauthTokenSecret = "oauthTokenSecret",
    createdAt = "createdAt",
    updatedAt = "updatedAt"
}


registerEnumType(TwitterAuthCredentialScalarFieldEnum, { name: 'TwitterAuthCredentialScalarFieldEnum', description: undefined })
