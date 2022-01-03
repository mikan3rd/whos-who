import { Module } from "@nestjs/common";

import { PersonSuggestionModule } from "@/modules/personSuggestion.module";
import { PersonSuggestionLikeRepository } from "@/repositories/personSuggestionLike.repository";
import { PersonSuggestionLikeResolver } from "@/resolvers/personSuggestionLike.resolver";
import { PersonSuggestionLikeUsecase } from "@/usecases/personSuggestionLike.usecase";

@Module({
  imports: [PersonSuggestionModule],
  providers: [PersonSuggestionLikeRepository, PersonSuggestionLikeResolver, PersonSuggestionLikeUsecase],
  exports: [PersonSuggestionLikeUsecase],
})
export class PersonSuggestionLikeModule {}
