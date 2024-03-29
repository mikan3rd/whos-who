import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { HideField } from '@nestjs/graphql';
import { User } from '../user/user.model';

@ObjectType()
export class TwitterAuthCredential {

    @Field(() => ID, {nullable:false})
    id!: string;

    @Field(() => String, {nullable:false})
    userId!: string;

    @Field(() => String, {nullable:false})
    uid!: string;

    @HideField()
    email!: string | null;

    @Field(() => String, {nullable:true})
    displayName!: string | null;

    @Field(() => String, {nullable:true})
    screenName!: string | null;

    @Field(() => String, {nullable:true})
    photoUrl!: string | null;

    @HideField()
    accessToken!: string;

    @HideField()
    refreshToken!: string;

    @HideField()
    oauthAccessToken!: string;

    @HideField()
    oauthTokenSecret!: string;

    @Field(() => Date, {nullable:false})
    createdAt!: Date;

    @Field(() => Date, {nullable:false})
    updatedAt!: Date;

    @Field(() => User, {nullable:false})
    user?: User;
}
