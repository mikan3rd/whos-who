import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class OccupationCount {

    @Field(() => Int, {nullable:false})
    Person!: number;
}
