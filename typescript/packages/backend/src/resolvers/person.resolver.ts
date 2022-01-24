import { Inject } from "@nestjs/common";
import { Args, Query, Resolver } from "@nestjs/graphql";

import { PersonUsecase } from "@/usecases/person.usecase";
import { Person } from "@prisma-model/person/person.model";

@Resolver()
export class PersonResolver {
  constructor(@Inject(PersonUsecase) private personUsecase: PersonUsecase) {}

  @Query((returns) => [Person])
  async searchPersonByWord(@Args("word") word: string): Promise<Person[]> {
    return this.personUsecase.searchByWord(word);
  }

  @Query((returns) => Person, { nullable: true })
  async getPersonById(@Args("id") id: string): Promise<Person | null> {
    return this.personUsecase.getById(id);
  }
}
