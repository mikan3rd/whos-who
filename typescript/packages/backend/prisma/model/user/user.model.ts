import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { UserRole } from '../prisma/user-role.enum';

@ObjectType()
export class User {

    @Field(() => ID, {nullable:false})
    uid!: string;

    @Field(() => String, {nullable:true})
    displayName!: string | null;

    @Field(() => String, {nullable:true})
    email!: string | null;

    @Field(() => UserRole, {nullable:false,defaultValue:'NONE'})
    role!: keyof typeof UserRole;

    @Field(() => Date, {nullable:false})
    createdAt!: Date;

    @Field(() => Date, {nullable:false})
    updatedAt!: Date;
}
