import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { UserRole } from '../prisma/user-role.enum';
import { UserStatus } from '../prisma/user-status.enum';
import { Ticket } from '../ticket/ticket.model';
import { TicketUserLike } from '../ticket-user-like/ticket-user-like.model';
import { UserCount } from './user-count.output';

@ObjectType()
export class User {

    @Field(() => ID, {nullable:false})
    id!: string;

    @Field(() => String, {nullable:true})
    displayName!: string | null;

    @Field(() => String, {nullable:true})
    email!: string | null;

    @Field(() => UserRole, {nullable:false,defaultValue:'NONE'})
    role!: keyof typeof UserRole;

    @Field(() => UserStatus, {nullable:false,defaultValue:'ACTIVE'})
    status!: keyof typeof UserStatus;

    @Field(() => Date, {nullable:false})
    createdAt!: Date;

    @Field(() => Date, {nullable:false})
    updatedAt!: Date;

    @Field(() => [Ticket], {nullable:true})
    tickets?: Array<Ticket>;

    @Field(() => [TicketUserLike], {nullable:true})
    ticketUserLikes?: Array<TicketUserLike>;

    @Field(() => UserCount, {nullable:false})
    _count?: UserCount;
}
