import { Storage } from "@google-cloud/storage";
import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { FileUpload } from "graphql-upload";
import { v4 as uuidv4 } from "uuid";

import { Prisma } from "@/interfaces/services/prisma.service";
import { TicketRepository } from "@/repositories/ticket.repository";

// TODO
type EnvironmentVariables = {
  GCP_PROJECT_ID: string;
  GCP_CLIENT_EMAIL: string;
  GCP_PRIVATE_KEY: string;
  CLOUD_STORAGE_PUBLIC_BUCKET: string;
};

@Injectable()
export class TicketUsecase {
  constructor(
    @Inject(TicketRepository) private ticketRepository: TicketRepository,
    private configService: ConfigService<EnvironmentVariables, true>,
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

    const [fileType, fileSubType] = file.mimetype.split("/");
    if (fileType !== "image") {
      throw BadRequestException;
    }

    const storage = new Storage({
      projectId: this.configService.get("GCP_PROJECT_ID"),
      credentials: {
        client_email: this.configService.get("GCP_CLIENT_EMAIL"),
        private_key: this.configService.get("GCP_PRIVATE_KEY"),
      },
    });
    const bucketName = this.configService.get("CLOUD_STORAGE_PUBLIC_BUCKET");
    const bucket = await storage.bucket(bucketName);

    // TODO: ファイル名の重複チェック
    const fileName = `${uuidv4()}.${fileSubType}`;

    const uploadFile = bucket.file(fileName);
    await uploadFile.setMetadata({ contentType: file.mimetype });

    const result = await new Promise<boolean>((resolve, reject) =>
      file
        .createReadStream()
        .pipe(uploadFile.createWriteStream())
        .on("finish", () => resolve(true))
        .on("error", () => reject(false)),
    );

    if (!result) {
      throw BadRequestException;
    }

    const filePath = uploadFile.publicUrl();
    const data: Prisma.TicketCreateInput = {
      user: { connect: { id: userId } },
      uploadedImage: { create: { bucketName, filePath } },
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
}
