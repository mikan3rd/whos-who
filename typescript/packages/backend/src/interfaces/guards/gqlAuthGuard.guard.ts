import { CanActivate, ExecutionContext, Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { GqlExecutionContext } from "@nestjs/graphql";
import { Request } from "express";
import admin from "firebase-admin";

import { UserUsecase } from "@/usecases/user.usecase";
import { User } from "@prisma-model/user/user.model";

export type ContextType = {
  req: Request;
  currentUser: User;
  decodedIdToken: admin.auth.DecodedIdToken;
};

@Injectable()
export class GqlAuthGuard implements CanActivate {
  private logger: Logger = new Logger(GqlAuthGuard.name);

  constructor(private readonly reflector: Reflector, private userUsecase: UserUsecase) {}

  public async canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context).getContext<ContextType>();

    const idToken = this.getIdToken(ctx.req);

    if (idToken === null) {
      throw new UnauthorizedException();
    }

    const decodedIdToken = await admin
      .auth()
      .verifyIdToken(idToken)
      .catch((e) => {
        this.logger.debug(e);
        throw new UnauthorizedException();
      });

    ctx.decodedIdToken = decodedIdToken;

    let currentUser = await this.userUsecase.getDetailById(decodedIdToken.uid);

    if (currentUser === null) {
      const { uid, email } = decodedIdToken;
      const user = await this.userUsecase.create({ id: uid, email, role: "NONE" });
      currentUser = await this.userUsecase.getDetailById(user.id);

      if (currentUser === null) {
        throw new UnauthorizedException();
      }
    }

    ctx.currentUser = currentUser;

    return true;
  }

  private getIdToken(request: Request) {
    const authHeader = request.headers.authorization;
    if (authHeader === undefined) {
      return null;
    }

    const [bearer, idToken] = authHeader.split(" ");

    if (bearer === undefined || bearer.toLowerCase() !== "bearer") {
      return null;
    }

    if (idToken === undefined) {
      return null;
    }

    return idToken;
  }
}
