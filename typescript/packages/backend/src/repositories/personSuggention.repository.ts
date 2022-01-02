import { Injectable } from "@nestjs/common";

import { Prisma, PrismaService } from "@/interfaces/services/prisma.service";

@Injectable()
export class PersonSuggestionRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.PersonSuggestionCreateInput) {
    return await this.prisma.personSuggestion.create({ data });
  }
}
