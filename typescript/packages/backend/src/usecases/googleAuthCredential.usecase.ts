import { Inject, Injectable } from "@nestjs/common";

import { GoogleAuthCredentialRepository } from "@/repositories/googleAuthCredential.repository";

@Injectable()
export class GoogleAuthCredentialUsecase {
  constructor(@Inject(GoogleAuthCredentialRepository) private credentialRepository: GoogleAuthCredentialRepository) {}

  async upsertAuth(args: { userId: string; accessToken: string; refreshToken: string }) {
    const { userId, accessToken, refreshToken } = args;
    return await this.credentialRepository.upsert({ userId, accessToken, refreshToken });
  }
}
