import { Injectable } from "@nestjs/common";

import { Prisma, PrismaService } from "@/interfaces/services/prisma.service";

@Injectable()
export class TicketRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.TicketCreateInput) {
    return await this.prisma.ticket.create({ data });
  }

  async getByExternalImageUrl(externalImageUrl: string) {
    return await this.prisma.ticket.findFirst({
      where: { externalImage: { url: externalImageUrl } },
    });
  }

  async getById(args: { id: string; userId?: string }) {
    const { id, userId } = args;
    return await this.prisma.ticket.findUnique({
      where: { id },
      include: {
        user: true,
        externalImage: true,
        uploadedImage: true,
        person: true,
        ticketUserLikes: {
          where: { userId },
        },
        personSuggestions: {
          include: { person: true, user: true, _count: true },
          orderBy: { personSuggestionLikes: { _count: "desc" } },
        },
        _count: true,
      },
    });
  }

  async update(id: string, data: Prisma.TicketUpdateInput) {
    return await this.prisma.ticket.update({
      data,
      where: { id },
    });
  }

  async getList(args: {
    take: number;
    page?: number;
    where: Prisma.TicketWhereInput;
    orderBy: Prisma.TicketOrderByWithRelationInput;
  }) {
    const { take, page, where, orderBy } = args;
    return await this.prisma.ticket.findMany({
      include: {
        externalImage: true,
        uploadedImage: true,
        _count: true,
      },
      where,
      orderBy,
      take,
      skip: page !== undefined ? take * (page - 1) : undefined,
    });
  }
}
