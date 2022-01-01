import { UseGuards } from "@nestjs/common";
import { Query, Resolver } from "@nestjs/graphql";

import { CurrentUser, CurrentUserType } from "@/interfaces/decorators/auth.decorator";
import { GqlAuthGuard } from "@/interfaces/guards/gqlAuthGuard.guard";
import { User } from "@prisma-model/user/user.model";

@Resolver()
export class UserResolver {
  @UseGuards(GqlAuthGuard)
  @Query((returns) => User)
  async getCurrentUser(@CurrentUser() { currentUser }: CurrentUserType): Promise<User> {
    return currentUser;
  }
}
