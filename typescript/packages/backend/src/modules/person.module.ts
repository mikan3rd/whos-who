import { Module } from "@nestjs/common";

import { PersonRepository } from "@/repositories/person.repository";
import { PersonResolver } from "@/resolvers/person.resolver";
import { PersonUsecase } from "@/usecases/person.usecase";

@Module({
  imports: [],
  providers: [PersonRepository, PersonResolver, PersonUsecase],
  exports: [PersonUsecase],
})
export class PersonModule {}
