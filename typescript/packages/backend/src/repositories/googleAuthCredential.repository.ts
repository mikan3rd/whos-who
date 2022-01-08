import { Injectable } from "@nestjs/common";

import { PrismaService } from "@/interfaces/services/prisma.service";

@Injectable()
export class GoogleAuthCredentialRepository {
  constructor(private prisma: PrismaService) {}

  async upsert(args: { userId: string; accessToken: string; refreshToken: string }) {
    const { userId, accessToken, refreshToken } = args;
    return await this.prisma.googleAuthCredential.upsert({
      where: { userId },
      create: { accessToken, refreshToken, user: { connect: { id: userId } } },
      update: { accessToken, refreshToken },
      include: { user: true },
    });
  }
}
