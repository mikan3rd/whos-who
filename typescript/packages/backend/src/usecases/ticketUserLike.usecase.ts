import { Inject, Injectable } from "@nestjs/common";

import { TicketUserLikeRepository } from "@/repositories/ticketUserLike.repository";

@Injectable()
export class TicketUserLikeUsecase {
  constructor(@Inject(TicketUserLikeRepository) private ticketUserLikeRepository: TicketUserLikeRepository) {}

  async createOrDelete(args: { userId: string; ticketId: string }) {
    const { userId, ticketId } = args;
    const ticketUserLike = await this.ticketUserLikeRepository.getByUserTicketId({ userId, ticketId });

    if (ticketUserLike !== null) {
      return await this.ticketUserLikeRepository.delete(ticketUserLike.id);
    }

    return await this.ticketUserLikeRepository.create({
      user: { connect: { id: userId } },
      ticket: { connect: { id: ticketId } },
    });
  }
}
