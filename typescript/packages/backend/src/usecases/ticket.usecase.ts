import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { FileUpload } from "graphql-upload";

import { TicketListInput } from "@/dto/input/ticketList.input";
import { Prisma } from "@/interfaces/services/prisma.service";
import { StorageRepository } from "@/repositories/storage.repository";
import { TicketRepository } from "@/repositories/ticket.repository";

@Injectable()
export class TicketUsecase {
  constructor(
    @Inject(TicketRepository) private ticketRepository: TicketRepository,
    private storageRepository: StorageRepository,
  ) {}

  async createByExternalImageUrl(args: { userId: string; externalImageUrl: string }) {
    const { userId, externalImageUrl } = args;
    const statusCode = 200; // TODO: ステータスコードのチェック

    const data: Prisma.TicketCreateInput = {
      user: { connect: { id: userId } },
      externalImage: { create: { url: externalImageUrl, statusCode } },
    };
    return await this.ticketRepository.create(data);
  }

  async createByUploadImageFile(args: { userId: string; file: FileUpload }) {
    const { userId, file } = args;

    const uploadFile = await this.storageRepository.uploadToPublicBucket({ file, folderName: "ticket" });

    const bucketName = uploadFile.bucket.name;
    const fileName = uploadFile.name;
    const url = uploadFile.publicUrl();

    const data: Prisma.TicketCreateInput = {
      user: { connect: { id: userId } },
      uploadedImage: { create: { bucketName, fileName, url } },
    };
    return await this.ticketRepository.create(data);
  }

  async getByExternalImageUrl(externalImageUrl: string) {
    return await this.ticketRepository.getByExternalImageUrl(externalImageUrl);
  }

  async getById(id: string) {
    return await this.ticketRepository.getById(id);
  }

  async update(id: string, data: Prisma.TicketUpdateInput) {
    return await this.ticketRepository.update(id, data);
  }

  async checkPersonId(id: string) {
    const ticket = await this.getById(id);
    if (ticket === null) {
      throw BadRequestException;
    }
    const targetPersonSuggestion = ticket.personSuggestions[0];
    if (targetPersonSuggestion === undefined) {
      return;
    }
    if (targetPersonSuggestion.personId !== ticket.personId) {
      await this.update(id, { person: { connect: { id: targetPersonSuggestion.personId } } });
    }
  }

  async getList(args: TicketListInput) {
    const { sortKey, sortOrder, filterByAnswered, take, page } = args;

    let where: Prisma.TicketWhereInput = {};
    if (filterByAnswered === true) {
      where = {
        personId: { not: null },
      };
    } else if (filterByAnswered === false) {
      where = {
        personId: null,
      };
    }

    let orderBy: Prisma.TicketOrderByWithRelationInput = {};
    if (sortOrder !== undefined) {
      if (sortKey === "createdAt") {
        orderBy = {
          createdAt: sortOrder,
        };
      } else if (sortKey === "ticketUserLikes") {
        orderBy = {
          ticketUserLikes: { _count: sortOrder },
        };
      }
    }

    return await this.ticketRepository.getList({ take, page, where, orderBy });
  }
}
