import { Injectable } from "@nestjs/common";

import { Prisma, PrismaService } from "@/interfaces/services/prisma.service";

export type GoogoleAuthCredentialUpsertInput = Omit<Prisma.GoogleAuthCredentialCreateInput, "user">;

@Injectable()
export class GoogleAuthCredentialRepository {
  constructor(private prisma: PrismaService) {}

  async upsert(args: { userId: string; data: GoogoleAuthCredentialUpsertInput }) {
    const { userId, data } = args;
    return await this.prisma.googleAuthCredential.upsert({
      where: { userId },
      create: { ...data, user: { connect: { id: userId } } },
      update: { ...data },
      include: { user: true },
    });
  }
}
