import { Inject, Injectable } from "@nestjs/common";

import { Prisma } from "@/interfaces/services/prisma.service";
import {
  GoogleAuthCredentialRepository,
  GoogoleAuthCredentialUpsertInput,
} from "@/repositories/googleAuthCredential.repository";
import { UserUsecase } from "@/usecases/user.usecase";

@Injectable()
export class GoogleAuthCredentialUsecase {
  constructor(
    @Inject(GoogleAuthCredentialRepository) private credentialRepository: GoogleAuthCredentialRepository,
    private userUsecase: UserUsecase,
  ) {}

  async upsertAuth(args: { userId: string; data: GoogoleAuthCredentialUpsertInput }) {
    const {
      userId,
      data,
      data: { email, photoUrl, displayName },
    } = args;
    const credential = await this.credentialRepository.upsert({ userId, data });

    const { user } = credential;
    const userData: Prisma.UserUpdateInput = {
      displayName: user.displayName === null ? displayName : undefined,
      email: user.email === null ? email : undefined,
      role: user.role === "NONE" ? "MEMBER" : undefined,
      photoUrl: user.photoUrl === null ? photoUrl : undefined,
    };
    await this.userUsecase.update({ id: userId, data: userData });

    return credential;
  }
}
