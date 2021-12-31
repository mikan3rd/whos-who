import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { User } from '../user/user.model';
import { UploadedImage } from '../uploaded-image/uploaded-image.model';
import { ExternalImage } from '../external-image/external-image.model';
import { Person } from '../person/person.model';

@ObjectType()
export class RequestedImage {

    @Field(() => ID, {nullable:false})
    id!: string;

    @Field(() => String, {nullable:false})
    userId!: string;

    @Field(() => String, {nullable:true})
    uploadedImageId!: string | null;

    @Field(() => String, {nullable:true})
    externalImageId!: string | null;

    @Field(() => String, {nullable:true})
    personId!: string | null;

    @Field(() => Date, {nullable:false})
    createdAt!: Date;

    @Field(() => Date, {nullable:false})
    updatedAt!: Date;

    @Field(() => User, {nullable:false})
    user?: User;

    @Field(() => UploadedImage, {nullable:true})
    uploadedImage?: UploadedImage | null;

    @Field(() => ExternalImage, {nullable:true})
    externalImage?: ExternalImage | null;

    @Field(() => Person, {nullable:true})
    person?: Person | null;
}
