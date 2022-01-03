import { BadRequestException, Inject, Injectable } from "@nestjs/common";

import { PersonSuggestionRepository } from "@/repositories/personSuggestion.repository";
import { PersonSuggestionLikeRepository } from "@/repositories/personSuggestionLike.repository";

@Injectable()
export class PersonSuggestionLikeUsecase {
  constructor(
    @Inject(PersonSuggestionLikeRepository) private personSuggestionLikeRepository: PersonSuggestionLikeRepository,
    private personSuggestionRepository: PersonSuggestionRepository,
  ) {}

  async createByPersonSuggestionId(args: { personSuggestionId: string; userId: string }) {
    const { personSuggestionId, userId } = args;
    const personSuggestion = await this.personSuggestionRepository.getById(personSuggestionId);
    if (personSuggestion === null) {
      throw BadRequestException;
    }
    const personSuggestionLike = await this.personSuggestionLikeRepository.getByTicketId({
      ticketId: personSuggestion.ticketId,
      userId,
    });
    if (personSuggestionLike !== null) {
      if (personSuggestionLike.personSuggestionId === personSuggestionId) {
        return personSuggestionLike;
      }
      await this.personSuggestionLikeRepository.delete(personSuggestionLike.id);
    }
    return await this.personSuggestionLikeRepository.create({
      ticket: { connect: { id: personSuggestion.ticketId } },
      personSuggestion: { connect: { id: personSuggestionId } },
      user: { connect: { id: userId } },
    });
  }
}
