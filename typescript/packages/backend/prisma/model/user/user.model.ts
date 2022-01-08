import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { UserRole } from '../prisma/user-role.enum';
import { UserStatus } from '../prisma/user-status.enum';
import { Int } from '@nestjs/graphql';
import { Ticket } from '../ticket/ticket.model';
import { TicketUserLike } from '../ticket-user-like/ticket-user-like.model';
import { PersonSuggestion } from '../person-suggestion/person-suggestion.model';
import { PersonSuggestionLike } from '../person-suggestion-like/person-suggestion-like.model';
import { GoogleAuthCredential } from '../google-auth-credential/google-auth-credential.model';
import { TwitterAuthCredential } from '../twitter-auth-credential/twitter-auth-credential.model';
import { UserCount } from './user-count.output';

@ObjectType()
export class User {

    @Field(() => ID, {nullable:false})
    id!: string;

    @Field(() => String, {nullable:false})
    authUid!: string;

    @Field(() => String, {nullable:true})
    displayName!: string | null;

    @Field(() => String, {nullable:true})
    photoUrl!: string | null;

    @Field(() => String, {nullable:true})
    email!: string | null;

    @Field(() => UserRole, {nullable:false,defaultValue:'NONE'})
    role!: keyof typeof UserRole;

    @Field(() => UserStatus, {nullable:false,defaultValue:'ACTIVE'})
    status!: keyof typeof UserStatus;

    @Field(() => Int, {nullable:false,defaultValue:0})
    point!: number;

    @Field(() => Date, {nullable:false})
    createdAt!: Date;

    @Field(() => Date, {nullable:false})
    updatedAt!: Date;

    @Field(() => [Ticket], {nullable:true})
    tickets?: Array<Ticket>;

    @Field(() => [TicketUserLike], {nullable:true})
    ticketUserLikes?: Array<TicketUserLike>;

    @Field(() => [PersonSuggestion], {nullable:true})
    personSuggestions?: Array<PersonSuggestion>;

    @Field(() => [PersonSuggestionLike], {nullable:true})
    personSuggestionLikes?: Array<PersonSuggestionLike>;

    @Field(() => GoogleAuthCredential, {nullable:true})
    googleAuthCredential?: GoogleAuthCredential | null;

    @Field(() => TwitterAuthCredential, {nullable:true})
    twitterAuthCredential?: TwitterAuthCredential | null;

    @Field(() => UserCount, {nullable:false})
    _count?: UserCount;
}
