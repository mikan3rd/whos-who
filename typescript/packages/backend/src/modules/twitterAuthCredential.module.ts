import { Module } from "@nestjs/common";

import { TwitterAuthCredentialRepository } from "@/repositories/twitterAuthCredential.reopsitory";
import { TwitterAuthCredentialResolver } from "@/resolvers/twitterAuthCredential.resolver";
import { TwitterAuthCredentialUsecase } from "@/usecases/twitterAuthCredential.usecase";

@Module({
  imports: [],
  providers: [TwitterAuthCredentialRepository, TwitterAuthCredentialResolver, TwitterAuthCredentialUsecase],
  exports: [TwitterAuthCredentialUsecase],
})
export class TwitterAuthCredentialModule {}
