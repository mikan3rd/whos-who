import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { RequestedTicket } from '../requested-ticket/requested-ticket.model';
import { Occupation } from '../occupation/occupation.model';
import { PersonCount } from './person-count.output';

@ObjectType()
export class Person {

    @Field(() => ID, {nullable:false})
    id!: string;

    @Field(() => String, {nullable:false})
    name!: string;

    @Field(() => String, {nullable:true})
    nameHiragana!: string | null;

    @Field(() => String, {nullable:true})
    nameKatakana!: string | null;

    @Field(() => String, {nullable:true})
    nameAlphabet!: string | null;

    @Field(() => Date, {nullable:true})
    birthDate!: Date | null;

    @Field(() => String, {nullable:true})
    occupationId!: string | null;

    @Field(() => Date, {nullable:false})
    createdAt!: Date;

    @Field(() => Date, {nullable:false})
    updatedAt!: Date;

    @Field(() => [RequestedTicket], {nullable:true})
    requestedTicket?: Array<RequestedTicket>;

    @Field(() => Occupation, {nullable:true})
    occupation?: Occupation | null;

    @Field(() => PersonCount, {nullable:false})
    _count?: PersonCount;
}