import { Injectable } from "@nestjs/common";

import { Prisma, PrismaService } from "@/interfaces/services/prisma.service";

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string) {
    return await this.prisma.user.findUnique({
      where: { id },
    });
  }

  async create(data: Prisma.UserCreateInput) {
    return await this.prisma.user.create({ data });
  }

  async update(args: { id: string; data: Prisma.UserUpdateInput }) {
    const { id, data } = args;
    return await this.prisma.user.update({ where: { id }, data });
  }
}
