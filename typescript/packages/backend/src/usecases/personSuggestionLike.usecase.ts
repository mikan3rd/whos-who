import { BadRequestException, Inject, Injectable } from "@nestjs/common";

import { PersonSuggestionRepository } from "@/repositories/personSuggestion.repository";
import { PersonSuggestionLikeRepository } from "@/repositories/personSuggestionLike.repository";
import { TicketUsecase } from "@/usecases/ticket.usecase";

@Injectable()
export class PersonSuggestionLikeUsecase {
  constructor(
    @Inject(PersonSuggestionLikeRepository) private personSuggestionLikeRepository: PersonSuggestionLikeRepository,
    private personSuggestionRepository: PersonSuggestionRepository,
    private ticketUsecase: TicketUsecase,
  ) {}

  async createByPersonSuggestionId(args: { personSuggestionId: string; userId: string }) {
    const { personSuggestionId, userId } = args;
    const personSuggestion = await this.personSuggestionRepository.getById(personSuggestionId);

    if (personSuggestion === null) {
      throw BadRequestException;
    }

    let personSuggestionLike = await this.personSuggestionLikeRepository.getByTicketId({
      ticketId: personSuggestion.ticketId,
      userId,
    });

    if (personSuggestionLike !== null) {
      if (personSuggestionLike.personSuggestionId === personSuggestionId) {
        return personSuggestionLike;
      }
      await this.personSuggestionLikeRepository.delete(personSuggestionLike.id);
    }

    personSuggestionLike = await this.personSuggestionLikeRepository.create({
      ticket: { connect: { id: personSuggestion.ticketId } },
      personSuggestion: { connect: { id: personSuggestionId } },
      user: { connect: { id: userId } },
    });

    await this.ticketUsecase.checkPersonId(personSuggestion.ticketId);

    return personSuggestionLike;
  }
}
