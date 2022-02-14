import { Inject, Injectable } from "@nestjs/common";

import { SortOrder } from "@/dto/input/sortOrder.input";
import { SortKey } from "@/dto/input/ticketList.input";
import { TicketUsecase } from "@/usecases/ticket.usecase";

@Injectable()
export class PageDataUsecase {
  constructor(@Inject(TicketUsecase) private ticketUsecase: TicketUsecase) {}

  async getTopPageData() {
    const take = 3;
    const ticketsOrderByCreatedAtData = await this.ticketUsecase.getList({
      sortKey: SortKey.createdAt,
      sortOrder: SortOrder.desc,
      take,
    });
    const ticketsOrderByLikeData = await this.ticketUsecase.getList({
      sortKey: SortKey.ticketUserLikes,
      sortOrder: SortOrder.desc,
      take,
    });
    return {
      ticketsOrderByCreatedAt: ticketsOrderByCreatedAtData.tickets,
      ticketsOrderByLike: ticketsOrderByLikeData.tickets,
    };
  }
}
