import { Injectable } from "@nestjs/common";

import { Prisma, PrismaService } from "@/interfaces/services/prisma.service";

export type TwitterAuthCredentialUpsertInput = Omit<Prisma.TwitterAuthCredentialCreateInput, "user">;

@Injectable()
export class TwitterAuthCredentialRepository {
  constructor(private prisma: PrismaService) {}

  async upsert(args: { userId: string; data: TwitterAuthCredentialUpsertInput }) {
    const { userId, data } = args;
    return await this.prisma.twitterAuthCredential.upsert({
      where: { userId },
      create: { ...data, user: { connect: { id: userId } } },
      update: { ...data },
      include: { user: true },
    });
  }
}
