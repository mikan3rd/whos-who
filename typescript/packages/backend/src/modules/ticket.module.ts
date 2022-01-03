import { Module } from "@nestjs/common";

import { TicketRepository } from "@/repositories/ticket.repository";
import { TicketResolver } from "@/resolvers/ticket.resolver";
import { TicketUsecase } from "@/usecases/ticket.usecase";

@Module({
  imports: [],
  providers: [TicketRepository, TicketResolver, TicketUsecase],
  exports: [TicketUsecase],
})
export class TicketModule {}
