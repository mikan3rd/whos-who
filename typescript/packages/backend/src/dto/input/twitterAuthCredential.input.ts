import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class TwitterAuthCredentialInput {
  @Field()
  accessToken!: string;

  @Field()
  refreshToken!: string;

  @Field()
  oauthAccessToken!: string;

  @Field()
  oauthTokenSecret!: string;

  @Field()
  uid!: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  displayName?: string;

  @Field({ nullable: true })
  screenName?: string;

  @Field({ nullable: true })
  photoUrl?: string;
}
