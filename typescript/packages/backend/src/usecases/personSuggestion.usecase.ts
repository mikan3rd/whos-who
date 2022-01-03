import { Inject, Injectable } from "@nestjs/common";

import { Prisma } from "@/interfaces/services/prisma.service";
import { PersonSuggestionRepository } from "@/repositories/personSuggestion.repository";
import { TicketUsecase } from "@/usecases/ticket.usecase";

@Injectable()
export class PersonSuggestionUsecase {
  constructor(
    @Inject(PersonSuggestionRepository) private personSuggestionRepository: PersonSuggestionRepository,
    private ticketUsecase: TicketUsecase,
  ) {}

  async getById(id: string) {
    return await this.personSuggestionRepository.getById(id);
  }

  async create(args: { ticketId: string; personId: string; userId: string }) {
    const { ticketId, personId, userId } = args;
    return this.commonCreate({
      ticketId,
      userId,
      person: { connect: { id: personId } },
    });
  }

  async createWithPerson(args: { ticketId: string; personName: string; userId: string }) {
    const { ticketId, personName, userId } = args;
    return this.commonCreate({
      ticketId,
      userId,
      person: { create: { name: personName } },
    });
  }

  private async commonCreate(args: {
    ticketId: string;
    userId: string;
    person: Prisma.PersonCreateNestedOneWithoutPersonSuggestionsInput;
  }) {
    const { ticketId, userId, person } = args;
    const data: Prisma.PersonSuggestionCreateInput = {
      ticket: { connect: { id: ticketId } },
      user: { connect: { id: userId } },
      person,
      personSuggestionLikes: {
        create: {
          user: { connect: { id: userId } },
          ticket: { connect: { id: ticketId } },
        },
      },
    };
    const personSuggestion = await this.personSuggestionRepository.create(data);

    const ticket = await this.ticketUsecase.getById(ticketId);
    if (ticket !== null && ticket.personId === null) {
      await this.ticketUsecase.update(ticketId, { person: { connect: { id: personSuggestion.personId } } });
    }

    return personSuggestion;
  }
}
