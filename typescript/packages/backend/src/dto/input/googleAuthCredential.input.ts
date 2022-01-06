import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class GoogleAuthCredentialInput {
  @Field()
  accessToken!: string;

  @Field()
  refreshToken!: string;
}
