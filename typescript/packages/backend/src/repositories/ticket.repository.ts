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
}
