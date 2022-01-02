import { Injectable } from "@nestjs/common";

import { Prisma, PrismaService } from "@/interfaces/services/prisma.service";

@Injectable()
export class PersonRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.PersonCreateInput) {
    return await this.prisma.person.create({ data });
  }
}
