import { BadRequestException, Inject, Injectable } from "@nestjs/common";

import { Prisma } from "@/interfaces/services/prisma.service";
import { TicketRepository } from "@/repositories/ticket.repository";

@Injectable()
export class TicketUsecase {
  constructor(@Inject(TicketRepository) private ticketRepository: TicketRepository) {}

  async createByExternalImageUrl(args: { userId: string; externalImageUrl: string }) {
    const { userId, externalImageUrl } = args;
    const statusCode = 200; // TODO: ステータスコードのチェック

    const data: Prisma.TicketCreateInput = {
      user: { connect: { id: userId } },
      externalImage: { create: { url: externalImageUrl, statusCode } },
    };
    return await this.ticketRepository.create(data);
  }

  async getByExternalImageUrl(externalImageUrl: string) {
    return await this.ticketRepository.getByExternalImageUrl(externalImageUrl);
  }

  async getById(id: string) {
    return await this.ticketRepository.getById(id);
  }

  async update(id: string, data: Prisma.TicketUpdateInput) {
    return await this.ticketRepository.update(id, data);
  }

  async checkPersonId(id: string) {
    const ticket = await this.getById(id);
    if (ticket === null) {
      throw BadRequestException;
    }
    const targetPersonSuggestion = ticket.personSuggestions[0];
    if (targetPersonSuggestion === undefined) {
      return;
    }
    if (targetPersonSuggestion.personId !== ticket.personId) {
      await this.update(id, { person: { connect: { id: targetPersonSuggestion.personId } } });
    }
  }
}
