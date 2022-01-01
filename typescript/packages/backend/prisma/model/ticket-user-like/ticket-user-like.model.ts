import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { Ticket } from '../ticket/ticket.model';
import { User } from '../user/user.model';

@ObjectType()
export class TicketUserLike {

    @Field(() => ID, {nullable:false})
    id!: string;

    @Field(() => String, {nullable:false})
    ticketId!: string;

    @Field(() => String, {nullable:false})
    userId!: string;

    @Field(() => Date, {nullable:false})
    createdAt!: Date;

    @Field(() => Date, {nullable:false})
    updatedAt!: Date;

    @Field(() => Ticket, {nullable:false})
    ticket?: Ticket;

    @Field(() => User, {nullable:false})
    user?: User;
}
