import { Global, Module } from "@nestjs/common";

import { StorageRepository } from "@/repositories/storage.repository";

@Global()
@Module({
  imports: [],
  providers: [StorageRepository],
  exports: [StorageRepository],
})
export class StorageModule {}
