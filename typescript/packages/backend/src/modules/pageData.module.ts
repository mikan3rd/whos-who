import { Module } from "@nestjs/common";

import { TicketModule } from "@/modules/ticket.module";
import { PageDataResolver } from "@/resolvers/pageData.resolver";
import { PageDataUsecase } from "@/usecases/pageData.usecase";

@Module({
  imports: [TicketModule],
  providers: [PageDataResolver, PageDataUsecase],
  exports: [PageDataUsecase],
})
export class PageDataeModule {}
