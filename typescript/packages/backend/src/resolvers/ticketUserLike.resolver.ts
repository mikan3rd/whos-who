import { Inject, UseGuards } from "@nestjs/common";
import { Args, Mutation, Resolver } from "@nestjs/graphql";

import { CurrentUser, CurrentUserType } from "@/interfaces/decorators/auth.decorator";
import { GqlAuthGuard } from "@/interfaces/guards/gqlAuthGuard.guard";
import { TicketUserLikeUsecase } from "@/usecases/ticketUserLike.usecase";
import { TicketUserLike } from "@prisma-model/ticket-user-like/ticket-user-like.model";

@Resolver()
export class TicketUserLikeResolver {
  constructor(@Inject(TicketUserLikeUsecase) private ticketUserLikeUsecase: TicketUserLikeUsecase) {}

  @UseGuards(GqlAuthGuard)
  @Mutation((returns) => TicketUserLike)
  async createOrDeleteTicketUserLike(
    @CurrentUser() { currentUser }: CurrentUserType,
    @Args("ticketId") ticketId: string,
  ): Promise<TicketUserLike | null> {
    return await this.ticketUserLikeUsecase.createOrDelete({
      userId: currentUser.id,
      ticketId,
    });
  }
}
