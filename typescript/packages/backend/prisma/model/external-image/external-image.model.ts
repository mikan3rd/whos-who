import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { RequestedImage } from '../requested-image/requested-image.model';

@ObjectType()
export class ExternalImage {

    @Field(() => ID, {nullable:false})
    id!: string;

    @Field(() => String, {nullable:false})
    url!: string;

    @Field(() => Int, {nullable:false})
    statusCode!: number;

    @Field(() => Date, {nullable:false})
    createdAt!: Date;

    @Field(() => Date, {nullable:false})
    updatedAt!: Date;

    @Field(() => RequestedImage, {nullable:true})
    requestedImage?: RequestedImage | null;
}
