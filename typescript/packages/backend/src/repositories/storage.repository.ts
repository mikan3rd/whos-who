import { Storage } from "@google-cloud/storage";
import { BadRequestException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { FileUpload } from "graphql-upload";
import { v4 as uuidv4 } from "uuid";

import { PrismaService } from "@/interfaces/services/prisma.service";

@Injectable()
export class StorageRepository {
  constructor(private prisma: PrismaService, private configService: ConfigService<EnvironmentVariables, true>) {}

  async uploadToPublicBucket(file: FileUpload) {
    const [fileType, fileSubType] = file.mimetype.split("/");
    if (fileType !== "image") {
      throw BadRequestException;
    }

    const bucket = await this.getPublicBucket();

    // TODO: ファイル名の重複チェック
    const fileName = `${uuidv4()}.${fileSubType}`;

    const uploadFile = bucket.file(fileName);

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

    return uploadFile;
  }

  async getFileFromPublicBucket(fileName: string) {
    const bucket = await this.getPublicBucket();
    return bucket.file(fileName);
  }

  private async getPublicBucket() {
    const storage = this.getStorage();
    const bucketName = this.configService.get("CLOUD_STORAGE_PUBLIC_BUCKET");
    return await storage.bucket(bucketName);
  }

  private getStorage() {
    return new Storage({
      projectId: this.configService.get("GCP_PROJECT_ID"),
      credentials: {
        client_email: this.configService.get("GCP_CLIENT_EMAIL"),
        private_key: this.configService.get("GCP_PRIVATE_KEY"),
      },
    });
  }
}
