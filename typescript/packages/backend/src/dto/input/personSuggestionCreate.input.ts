import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class PersonSuggestionCreateInput {
  @Field()
  ticketId!: string;

  @Field()
  personId?: string;

  @Field()
  personName?: string;
}
