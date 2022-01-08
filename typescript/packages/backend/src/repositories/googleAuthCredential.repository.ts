import { Injectable } from "@nestjs/common";

import { PrismaService } from "@/interfaces/services/prisma.service";

@Injectable()
export class GoogleAuthCredentialRepository {
  constructor(private prisma: PrismaService) {}

  async upsert(args: {
    userId: string;
    accessToken: string;
    refreshToken: string;
    uid: string;
    email: string;
    photoUrl?: string | null;
  }) {
    const { userId, accessToken, refreshToken, uid, email, photoUrl } = args;
    return await this.prisma.googleAuthCredential.upsert({
      where: { userId },
      create: { accessToken, refreshToken, uid, email, photoUrl, user: { connect: { id: userId } } },
      update: { accessToken, refreshToken, uid, email, photoUrl },
      include: { user: true },
    });
  }
}
