import { Inject, UseGuards } from "@nestjs/common";
import { Args, Mutation, Resolver } from "@nestjs/graphql";

import { GoogleAuthCredentialInput } from "@/dto/input/googleAuthCredential.input";
import { CurrentUser, CurrentUserType } from "@/interfaces/decorators/auth.decorator";
import { GqlAuthGuard } from "@/interfaces/guards/gqlAuthGuard.guard";
import { GoogleAuthCredentialUsecase } from "@/usecases/googleAuthCredential.usecase";
import { GoogleAuthCredential } from "@prisma-model/google-auth-credential/google-auth-credential.model";

@Resolver()
export class GoogleAuthCredentialResolver {
  constructor(@Inject(GoogleAuthCredentialUsecase) private googleUsecase: GoogleAuthCredentialUsecase) {}

  @UseGuards(GqlAuthGuard)
  @Mutation((returns) => GoogleAuthCredential)
  async upsertGoogleAuthCredential(
    @CurrentUser() { currentUser }: CurrentUserType,
    @Args("googleAuthCredentialInput") googleAuthCredentialInput: GoogleAuthCredentialInput,
  ): Promise<GoogleAuthCredential> {
    return await this.googleUsecase.upsertAuth({
      userId: currentUser.id,
      data: googleAuthCredentialInput,
    });
  }
}
