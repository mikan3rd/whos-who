import { Module } from "@nestjs/common";

import { GoogleAuthCredentialRepository } from "@/repositories/googleAuthCredential.repository";
import { GoogleAuthCredentialResolver } from "@/resolvers/googleAuthCredential.resolver";
import { GoogleAuthCredentialUsecase } from "@/usecases/googleAuthCredential.usecase";

@Module({
  imports: [],
  providers: [GoogleAuthCredentialRepository, GoogleAuthCredentialResolver, GoogleAuthCredentialUsecase],
  exports: [GoogleAuthCredentialUsecase],
})
export class GoogleAuthCredentialModule {}
