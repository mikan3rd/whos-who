import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { Ticket } from '../ticket/ticket.model';
import { Person } from '../person/person.model';
import { User } from '../user/user.model';
import { PersonSuggestionLike } from '../person-suggestion-like/person-suggestion-like.model';
import { PersonSuggestionCount } from './person-suggestion-count.output';

@ObjectType()
export class PersonSuggestion {

    @Field(() => ID, {nullable:false})
    id!: string;

    @Field(() => String, {nullable:false})
    ticketId!: string;

    @Field(() => String, {nullable:false})
    personId!: string;

    @Field(() => String, {nullable:false})
    userId!: string;

    @Field(() => Date, {nullable:false})
    createdAt!: Date;

    @Field(() => Date, {nullable:false})
    updatedAt!: Date;

    @Field(() => Ticket, {nullable:false})
    ticket?: Ticket;

    @Field(() => Person, {nullable:false})
    person?: Person;

    @Field(() => User, {nullable:false})
    user?: User;

    @Field(() => [PersonSuggestionLike], {nullable:true})
    personSuggestionLikes?: Array<PersonSuggestionLike>;

    @Field(() => Ticket, {nullable:true})
    mainTicket?: Ticket | null;

    @Field(() => PersonSuggestionCount, {nullable:false})
    _count?: PersonSuggestionCount;
}
