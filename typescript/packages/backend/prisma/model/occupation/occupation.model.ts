import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { Person } from '../person/person.model';
import { OccupationCount } from './occupation-count.output';

@ObjectType()
export class Occupation {

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

    @Field(() => [Person], {nullable:true})
    Person?: Array<Person>;

    @Field(() => OccupationCount, {nullable:false})
    _count?: OccupationCount;
}
