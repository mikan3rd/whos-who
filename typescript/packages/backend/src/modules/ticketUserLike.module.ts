import { Module } from "@nestjs/common";

import { TicketUserLikeRepository } from "@/repositories/ticketUserLike.repository";
import { TicketUserLikeResolver } from "@/resolvers/ticketUserLike.resolver";
import { TicketUserLikeUsecase } from "@/usecases/ticketUserLike.usecase";

@Module({
  imports: [],
  providers: [TicketUserLikeRepository, TicketUserLikeResolver, TicketUserLikeUsecase],
  exports: [TicketUserLikeUsecase],
})
export class TicketUserLikeModule {}
