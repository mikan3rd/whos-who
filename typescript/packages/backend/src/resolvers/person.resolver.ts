import { Inject, UseGuards } from "@nestjs/common";
import { Args, Query, Resolver } from "@nestjs/graphql";

import { GqlAuthGuard } from "@/interfaces/guards/gqlAuthGuard.guard";
import { PersonUsecase } from "@/usecases/person.usecase";
import { Person } from "@prisma-model/person/person.model";

@Resolver()
export class PersonResolver {
  constructor(@Inject(PersonUsecase) private personUsecase: PersonUsecase) {}

  @UseGuards(GqlAuthGuard)
  @Query((returns) => [Person])
  async searchPersonByWord(@Args("word") word: string): Promise<Person[]> {
    return this.personUsecase.searchByWord(word);
  }
}
