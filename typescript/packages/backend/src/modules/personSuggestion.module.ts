import { Module } from "@nestjs/common";

import { PersonSuggestionRepository } from "@/repositories/personSuggention.repository";
import { PersonSuggestionResolver } from "@/resolvers/personSuggestion.resolver";
import { PersonSuggestionUsecase } from "@/usecases/personSuggestion.usecase";

@Module({
  imports: [],
  providers: [PersonSuggestionRepository, PersonSuggestionResolver, PersonSuggestionUsecase],
  exports: [],
})
export class PersonSuggestionModule {}
