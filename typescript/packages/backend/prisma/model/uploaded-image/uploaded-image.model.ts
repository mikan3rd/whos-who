import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { RequestedTicket } from '../requested-ticket/requested-ticket.model';

@ObjectType()
export class UploadedImage {

    @Field(() => ID, {nullable:false})
    id!: string;

    @Field(() => String, {nullable:false})
    bucketName!: string;

    @Field(() => String, {nullable:false})
    filePath!: string;

    @Field(() => Date, {nullable:false})
    createdAt!: Date;

    @Field(() => Date, {nullable:false})
    updatedAt!: Date;

    @Field(() => RequestedTicket, {nullable:true})
    requestedTicket?: RequestedTicket | null;
}
