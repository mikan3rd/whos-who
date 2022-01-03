import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class PersonSuggestionCount {

    @Field(() => Int, {nullable:false})
    personSuggestionLikes!: number;
}
