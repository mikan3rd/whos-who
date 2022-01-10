import { Injectable } from "@nestjs/common";

import { Prisma, PrismaService } from "@/interfaces/services/prisma.service";

@Injectable()
export class TicketUserLikeRepository {
  constructor(private prisma: PrismaService) {}

  async getByUserTicketId(args: { userId: string; ticketId: string }) {
    const { userId, ticketId } = args;
    return await this.prisma.ticketUserLike.findUnique({ where: { ticketId_userId: { userId, ticketId } } });
  }

  async create(data: Prisma.TicketUserLikeCreateInput) {
    return await this.prisma.ticketUserLike.create({ data });
  }

  async delete(id: string) {
    return await this.prisma.ticketUserLike.delete({ where: { id } });
  }
}
