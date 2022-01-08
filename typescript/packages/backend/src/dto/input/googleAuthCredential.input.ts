import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class GoogleAuthCredentialInput {
  @Field()
  accessToken!: string;

  @Field()
  refreshToken!: string;

  @Field()
  uid!: string;

  @Field()
  email!: string;

  @Field({ nullable: true })
  displayName?: string;

  @Field({ nullable: true })
  photoUrl?: string;
}
