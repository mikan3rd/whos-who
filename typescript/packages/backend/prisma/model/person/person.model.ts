import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { Ticket } from '../ticket/ticket.model';
import { Occupation } from '../occupation/occupation.model';
import { PersonSuggestion } from '../person-suggestion/person-suggestion.model';
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

    @Field(() => [Ticket], {nullable:true})
    tickets?: Array<Ticket>;

    @Field(() => Occupation, {nullable:true})
    occupation?: Occupation | null;

    @Field(() => [PersonSuggestion], {nullable:true})
    personSuggestions?: Array<PersonSuggestion>;

    @Field(() => PersonCount, {nullable:false})
    _count?: PersonCount;
}
