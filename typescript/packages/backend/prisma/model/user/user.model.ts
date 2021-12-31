import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { UserRole } from '../prisma/user-role.enum';
import { RequestedImage } from '../requested-image/requested-image.model';
import { UserCount } from './user-count.output';

@ObjectType()
export class User {

    @Field(() => ID, {nullable:false})
    id!: string;

    @Field(() => String, {nullable:true})
    displayName!: string | null;

    @Field(() => String, {nullable:true})
    email!: string | null;

    @Field(() => UserRole, {nullable:false,defaultValue:'NONE'})
    role!: keyof typeof UserRole;

    @Field(() => Boolean, {nullable:false,defaultValue:false})
    verified!: boolean;

    @Field(() => Date, {nullable:false})
    createdAt!: Date;

    @Field(() => Date, {nullable:false})
    updatedAt!: Date;

    @Field(() => [RequestedImage], {nullable:true})
    requestedImages?: Array<RequestedImage>;

    @Field(() => UserCount, {nullable:false})
    _count?: UserCount;
}
