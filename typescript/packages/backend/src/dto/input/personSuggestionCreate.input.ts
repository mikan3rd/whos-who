import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class PersonSuggestionCreateInput {
  @Field()
  ticketId!: string;

  @Field({ nullable: true })
  personId?: string;

  @Field({ nullable: true })
  personName?: string;
}
