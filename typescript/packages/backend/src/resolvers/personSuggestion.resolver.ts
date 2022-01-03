import { BadRequestException, Inject, UseGuards } from "@nestjs/common";
import { Args, Mutation, Resolver } from "@nestjs/graphql";

import { PersonSuggestionCreateInput } from "@/dto/input/personSuggestionCreate.input";
import { CurrentUser, CurrentUserType } from "@/interfaces/decorators/auth.decorator";
import { GqlAuthGuard } from "@/interfaces/guards/gqlAuthGuard.guard";
import { PersonSuggestionUsecase } from "@/usecases/personSuggestion.usecase";
import { PersonSuggestion } from "@prisma-model/person-suggestion/person-suggestion.model";

@Resolver()
export class PersonSuggestionResolver {
  constructor(@Inject(PersonSuggestionUsecase) private personSuggestionUsecase: PersonSuggestionUsecase) {}

  @UseGuards(GqlAuthGuard)
  @Mutation((returns) => PersonSuggestion)
  async createPersonSuggestion(
    @CurrentUser() { currentUser }: CurrentUserType,
    @Args("personSuggestionCreate") personSuggestionCreate: PersonSuggestionCreateInput,
  ): Promise<PersonSuggestion> {
    const { ticketId, personId, personName } = personSuggestionCreate;
    if (personId !== undefined) {
      return this.personSuggestionUsecase.create({
        ticketId,
        personId,
        userId: currentUser.id,
      });
    }
    if (personName !== undefined) {
      return this.personSuggestionUsecase.createWithPerson({
        ticketId,
        personName,
        userId: currentUser.id,
      });
    }
    throw BadRequestException;
  }
}
