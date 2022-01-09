import { Inject, Injectable } from "@nestjs/common";

import { Prisma } from "@/interfaces/services/prisma.service";
import {
  TwitterAuthCredentialRepository,
  TwitterAuthCredentialUpsertInput,
} from "@/repositories/twitterAuthCredential.reopsitory";
import { UserUsecase } from "@/usecases/user.usecase";

@Injectable()
export class TwitterAuthCredentialUsecase {
  constructor(
    @Inject(TwitterAuthCredentialRepository) private credentialRepository: TwitterAuthCredentialRepository,
    private userUsecase: UserUsecase,
  ) {}

  async upsertAuth(args: { userId: string; data: TwitterAuthCredentialUpsertInput }) {
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
