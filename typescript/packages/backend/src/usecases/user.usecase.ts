import { Inject, Injectable } from "@nestjs/common";

import { Prisma } from "@/interfaces/services/prisma.service";
import { UserRepository } from "@/repositories/user.repository";

@Injectable()
export class UserUsecase {
  constructor(@Inject(UserRepository) private userRepository: UserRepository) {}

  async getDetailById(id: string) {
    return await this.userRepository.findById(id);
  }

  async create(data: Prisma.UserCreateInput) {
    return await this.userRepository.create(data);
  }

  async update(args: { id: string; data: Prisma.UserUpdateInput }) {
    const { id, data } = args;
    return await this.userRepository.update({ id, data });
  }
}
