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
    uid: string;
    email: string;
    photoUrl?: string | null;
    displayName?: string;
  }) {
    const { userId, accessToken, refreshToken, uid, email, photoUrl, displayName } = args;
    const credential = await this.credentialRepository.upsert({
      userId,
      accessToken,
      refreshToken,
      uid,
      email,
      photoUrl,
    });
    const { user } = credential;

    const data: Prisma.UserUpdateInput = {
      displayName: user.displayName === null ? displayName : undefined,
      email: user.email === null ? email : undefined,
      role: user.role === "NONE" ? "MEMBER" : undefined,
      photoUrl: user.photoUrl === null ? photoUrl : undefined,
    };
    await this.userUsecase.update({ id: userId, data });

    return credential;
  }
}
