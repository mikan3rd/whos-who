import { Inject, Injectable } from "@nestjs/common";

import { Prisma } from "@/interfaces/services/prisma.service";
import { PersonSuggestionRepository } from "@/repositories/personSuggestion.repository";

@Injectable()
export class PersonSuggestionUsecase {
  constructor(@Inject(PersonSuggestionRepository) private personSuggestionRepository: PersonSuggestionRepository) {}

  async create(args: { ticketId: string; personId: string; userId: string }) {
    const { ticketId, personId, userId } = args;
    const data: Prisma.PersonSuggestionCreateInput = {
      ticket: { connect: { id: ticketId } },
      person: { connect: { id: personId } },
      user: { connect: { id: userId } },
      personSuggestionLikes: {
        create: {
          user: { connect: { id: userId } },
          ticket: { connect: { id: ticketId } },
        },
      },
    };
    return await this.personSuggestionRepository.create(data);
  }

  async createWithPerson(args: { ticketId: string; personName: string; userId: string }) {
    const { ticketId, personName, userId } = args;
    const data: Prisma.PersonSuggestionCreateInput = {
      ticket: { connect: { id: ticketId } },
      person: { create: { name: personName } },
      user: { connect: { id: userId } },
      personSuggestionLikes: {
        create: {
          user: { connect: { id: userId } },
          ticket: { connect: { id: ticketId } },
        },
      },
    };
    return await this.personSuggestionRepository.create(data);
  }
}
