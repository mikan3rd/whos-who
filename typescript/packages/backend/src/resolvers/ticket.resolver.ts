import { Inject, UseGuards } from "@nestjs/common";
import { Args, Mutation, Resolver } from "@nestjs/graphql";

import { CurrentUser, CurrentUserType } from "@/interfaces/decorators/auth.decorator";
import { GqlAuthGuard } from "@/interfaces/guards/gqlAuthGuard.guard";
import { TicketUsecase } from "@/usecases/ticket.usecase";
import { Ticket } from "@prisma-model/ticket/ticket.model";

@Resolver()
export class TicketResolver {
  constructor(@Inject(TicketUsecase) private ticketUsecase: TicketUsecase) {}

  @UseGuards(GqlAuthGuard)
  @Mutation((returns) => Ticket)
  async createTicketByExternalImageUrl(
    @CurrentUser() { currentUser }: CurrentUserType,
    @Args("externalImageUrl") externalImageUrl: string,
  ): Promise<Ticket> {
    return this.ticketUsecase.createByExternalImageUrl({
      userId: currentUser.id,
      externalImageUrl,
    });
  }
}
