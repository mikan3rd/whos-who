import { Inject, Injectable } from "@nestjs/common";

import { PersonRepository } from "@/repositories/person.repository";

@Injectable()
export class PersonUsecase {
  constructor(@Inject(PersonRepository) private personRepository: PersonRepository) {}

  async searchByWord(word: string) {
    return await this.personRepository.searchByWord(word);
  }

  async getById(id: string) {
    return await this.personRepository.getById(id);
  }
}
