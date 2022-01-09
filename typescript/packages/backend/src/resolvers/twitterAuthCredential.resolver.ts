import { Inject, UseGuards } from "@nestjs/common";
import { Args, Mutation, Resolver } from "@nestjs/graphql";

import { TwitterAuthCredentialInput } from "@/dto/input/twitterAuthCredential.input";
import { CurrentUser, CurrentUserType } from "@/interfaces/decorators/auth.decorator";
import { GqlAuthGuard } from "@/interfaces/guards/gqlAuthGuard.guard";
import { TwitterAuthCredentialUsecase } from "@/usecases/twitterAuthCredential.usecase";
import { TwitterAuthCredential } from "@prisma-model/twitter-auth-credential/twitter-auth-credential.model";

@Resolver()
export class TwitterAuthCredentialResolver {
  constructor(@Inject(TwitterAuthCredentialUsecase) private twitterUsecase: TwitterAuthCredentialUsecase) {}

  @UseGuards(GqlAuthGuard)
  @Mutation((returns) => TwitterAuthCredential)
  async upsertGoogleAuthCredential(
    @CurrentUser() { currentUser }: CurrentUserType,
    @Args("twitterAuthCredentialInput") twitterAuthCredentialInput: TwitterAuthCredentialInput,
  ): Promise<TwitterAuthCredential> {
    return await this.twitterUsecase.upsertAuth({
      userId: currentUser.id,
      data: twitterAuthCredentialInput,
    });
  }
}
