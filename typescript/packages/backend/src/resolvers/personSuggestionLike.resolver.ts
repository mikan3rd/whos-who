import { Inject, UseGuards } from "@nestjs/common";
import { Args, Mutation, Resolver } from "@nestjs/graphql";

import { CurrentUser, CurrentUserType } from "@/interfaces/decorators/auth.decorator";
import { GqlAuthGuard } from "@/interfaces/guards/gqlAuthGuard.guard";
import { PersonSuggestionLikeUsecase } from "@/usecases/personSuggestionLike.usecase";
import { PersonSuggestionLike } from "@prisma-model/person-suggestion-like/person-suggestion-like.model";

@Resolver()
export class PersonSuggestionLikeResolver {
  constructor(@Inject(PersonSuggestionLikeUsecase) private personSuggestionLikeUsecase: PersonSuggestionLikeUsecase) {}

  @UseGuards(GqlAuthGuard)
  @Mutation((returns) => PersonSuggestionLike)
  async createPersonSuggestionLike(
    @CurrentUser() { currentUser }: CurrentUserType,
    @Args("personSuggestionId") personSuggestionId: string,
  ): Promise<PersonSuggestionLike> {
    return this.personSuggestionLikeUsecase.createByPersonSuggestionId({
      personSuggestionId,
      userId: currentUser.id,
    });
  }
}
