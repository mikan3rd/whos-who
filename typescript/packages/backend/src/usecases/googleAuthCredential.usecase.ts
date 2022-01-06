import { Inject, Injectable } from "@nestjs/common";

import { Prisma } from "@/interfaces/services/prisma.service";
import { GoogleAuthCredentialRepository } from "@/repositories/googleAuthCredential.repository";
import { UserUsecase } from "@/usecases/user.usecase";

@Injectable()
export class GoogleAuthCredentialUsecase {
  constructor(
    @Inject(GoogleAuthCredentialRepository) private credentialRepository: GoogleAuthCredentialRepository,
    private userUsecase: UserUsecase,
  ) {}

  async upsertAuth(args: {
    userId: string;
    accessToken: string;
    refreshToken: string;
    displayName?: string;
    email: string;
  }) {
    const { userId, accessToken, refreshToken, displayName, email } = args;
    const credential = await this.credentialRepository.upsert({ userId, accessToken, refreshToken });
    const { user } = credential;

    const data: Prisma.UserUpdateInput = {
      displayName: user.displayName === null ? displayName : undefined,
      email: user.email === null ? email : undefined,
      role: user.role === "NONE" ? "MEMBER" : undefined,
    };
    await this.userUsecase.update({ id: userId, data });

    return credential;
  }
}
