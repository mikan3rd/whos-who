import { Global, Module } from "@nestjs/common";

import { UserRepository } from "@/repositories/user.repository";
import { UserResolver } from "@/resolvers/user.resolver";
import { UserUsecase } from "@/usecases/user.usecase";

@Global()
@Module({
  imports: [],
  providers: [UserResolver, UserRepository, UserUsecase],
  exports: [UserUsecase],
})
export class UserModule {}
