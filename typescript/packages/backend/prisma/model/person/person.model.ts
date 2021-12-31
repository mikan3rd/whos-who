import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { RequestedImage } from '../requested-image/requested-image.model';
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

    @Field(() => Date, {nullable:false})
    createdAt!: Date;

    @Field(() => Date, {nullable:false})
    updatedAt!: Date;

    @Field(() => [RequestedImage], {nullable:true})
    requestedImage?: Array<RequestedImage>;

    @Field(() => PersonCount, {nullable:false})
    _count?: PersonCount;
}
