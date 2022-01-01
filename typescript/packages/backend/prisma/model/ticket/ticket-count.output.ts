import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class TicketCount {

    @Field(() => Int, {nullable:false})
    ticketUserLikes!: number;
}
