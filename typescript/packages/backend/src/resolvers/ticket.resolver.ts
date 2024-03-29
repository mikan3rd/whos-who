import { Inject, UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { FileUpload, GraphQLUpload } from "graphql-upload";

import { TicketListInput } from "@/dto/input/ticketList.input";
import { TicketListOutput } from "@/dto/output/ticketList.output";
import {
  CurrentUser,
  CurrentUserType,
  IsAllowNoCurrentUser,
  OptionalCurrentUserType,
} from "@/interfaces/decorators/auth.decorator";
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

  @UseGuards(GqlAuthGuard)
  @Mutation((returns) => Ticket)
  async createTicketByUploadImageFile(
    @CurrentUser() { currentUser }: CurrentUserType,
    @Args({ name: "file", type: () => GraphQLUpload }) file: FileUpload,
  ): Promise<Ticket> {
    return this.ticketUsecase.createByUploadImageFile({
      userId: currentUser.id,
      file,
    });
  }

  @UseGuards(GqlAuthGuard)
  @Query((returns) => Ticket, { nullable: true })
  async getTicketByExternalImageUrl(@Args("externalImageUrl") externalImageUrl: string): Promise<Ticket | null> {
    return this.ticketUsecase.getByExternalImageUrl(externalImageUrl);
  }

  @IsAllowNoCurrentUser()
  @UseGuards(GqlAuthGuard)
  @Query((returns) => Ticket, { nullable: true })
  async getTicketById(
    @CurrentUser() { currentUser }: OptionalCurrentUserType,
    @Args("id") id: string,
  ): Promise<Ticket | null> {
    return this.ticketUsecase.getById({ id, userId: currentUser?.id });
  }

  @UseGuards(GqlAuthGuard)
  @Query((returns) => TicketListOutput)
  async getTicketList(@Args("ticketListInput") ticketListInput: TicketListInput): Promise<TicketListOutput> {
    return this.ticketUsecase.getList(ticketListInput);
  }
}
