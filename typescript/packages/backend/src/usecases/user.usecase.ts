import { Inject, Injectable } from "@nestjs/common";

import { UserRepository } from "@/repositories/user.repository";

@Injectable()
export class UserUsecase {
  constructor(@Inject(UserRepository) private userRepository: UserRepository) {}

  async getDetailById(id: string) {
    return await this.userRepository.findById(id);
  }
}
