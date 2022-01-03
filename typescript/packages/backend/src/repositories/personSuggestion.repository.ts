import { Injectable } from "@nestjs/common";

import { Prisma, PrismaService } from "@/interfaces/services/prisma.service";

@Injectable()
export class PersonSuggestionRepository {
  constructor(private prisma: PrismaService) {}

  async getById(id: string) {
    return await this.prisma.personSuggestion.findUnique({ where: { id } });
  }

  async create(data: Prisma.PersonSuggestionCreateInput) {
    return await this.prisma.personSuggestion.create({ data });
  }
}
