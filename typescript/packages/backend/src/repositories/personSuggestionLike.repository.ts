import { Injectable } from "@nestjs/common";

import { Prisma, PrismaService } from "@/interfaces/services/prisma.service";

@Injectable()
export class PersonSuggestionLikeRepository {
  constructor(private prisma: PrismaService) {}

  async getByTicketId(args: { ticketId: string; userId: string }) {
    const { ticketId, userId } = args;
    return await this.prisma.personSuggestionLike.findFirst({
      where: {
        ticket: { id: ticketId },
        user: { id: userId },
      },
    });
  }

  async create(data: Prisma.PersonSuggestionLikeCreateInput) {
    return await this.prisma.personSuggestionLike.create({ data });
  }

  async delete(id: string) {
    return await this.prisma.personSuggestionLike.delete({ where: { id } });
  }
}
