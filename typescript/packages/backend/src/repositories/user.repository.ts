import { Injectable } from "@nestjs/common";

import { Prisma, PrismaService } from "@/interfaces/services/prisma.service";

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async findByAuthUid(authUid: string) {
    return await this.prisma.user.findUnique({
      where: { authUid },
      include: {
        googleAuthCredential: true,
        twitterAuthCredential: true,
      },
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
