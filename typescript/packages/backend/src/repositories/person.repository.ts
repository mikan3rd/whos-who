import { Injectable } from "@nestjs/common";

import { PrismaService } from "@/interfaces/services/prisma.service";

@Injectable()
export class PersonRepository {
  constructor(private prisma: PrismaService) {}

  async searchByWord(word: string) {
    return await this.prisma.person.findMany({
      take: 10,
      where: {
        OR: [
          { name: { contains: word } },
          { nameAlphabet: { contains: word } },
          { nameHiragana: { contains: word } },
          { nameKatakana: { contains: word } },
        ],
      },
    });
  }
}
