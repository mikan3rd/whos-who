import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { User } from '../user/user.model';
import { UploadedImage } from '../uploaded-image/uploaded-image.model';
import { ExternalImage } from '../external-image/external-image.model';
import { Person } from '../person/person.model';
import { PersonSuggestion } from '../person-suggestion/person-suggestion.model';
import { TicketUserLike } from '../ticket-user-like/ticket-user-like.model';
import { PersonSuggestionLike } from '../person-suggestion-like/person-suggestion-like.model';
import { TicketCount } from './ticket-count.output';

@ObjectType()
export class Ticket {

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

    @Field(() => String, {nullable:true})
    mainPersonSuggestionId!: string | null;

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

    @Field(() => PersonSuggestion, {nullable:true})
    mainPersonSuggestion?: PersonSuggestion | null;

    @Field(() => [TicketUserLike], {nullable:true})
    ticketUserLikes?: Array<TicketUserLike>;

    @Field(() => [PersonSuggestion], {nullable:true})
    personSuggestions?: Array<PersonSuggestion>;

    @Field(() => [PersonSuggestionLike], {nullable:true})
    personSuggestionLikes?: Array<PersonSuggestionLike>;

    @Field(() => TicketCount, {nullable:false})
    _count?: TicketCount;
}
