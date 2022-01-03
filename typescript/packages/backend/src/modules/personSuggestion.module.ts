import { Module } from "@nestjs/common";

import { TicketModule } from "@/modules/ticket.module";
import { PersonSuggestionRepository } from "@/repositories/personSuggestion.repository";
import { PersonSuggestionResolver } from "@/resolvers/personSuggestion.resolver";
import { PersonSuggestionUsecase } from "@/usecases/personSuggestion.usecase";

@Module({
  imports: [TicketModule],
  providers: [PersonSuggestionRepository, PersonSuggestionResolver, PersonSuggestionUsecase],
  exports: [PersonSuggestionUsecase],
})
export class PersonSuggestionModule {}
