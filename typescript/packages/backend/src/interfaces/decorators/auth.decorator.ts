import { ExecutionContext, SetMetadata, createParamDecorator } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";

import { ContextType } from "@/interfaces/guards/gqlAuthGuard.guard";

export type CurrentUserType = {
  currentUser: NonNullable<ContextType["currentUser"]>;
  currentToken: NonNullable<ContextType["decodedIdToken"]>;
};
export type OptionalCurrentUserType = Pick<ContextType, "currentUser" | "decodedIdToken">;

export const CurrentUser = createParamDecorator<unknown, ExecutionContext>((data, context) => {
  const { currentUser, decodedIdToken } = GqlExecutionContext.create(context).getContext<ContextType>();
  const params: CurrentUserType | OptionalCurrentUserType = { currentUser, decodedIdToken };
  return params;
});

// Authorization Headerからuserを取得できない場合も許可する
export const IsAllowNoCurrentUserKey = "isAllowNoCurrentUser";
export const IsAllowNoCurrentUser = (isAllow = true) => SetMetadata(IsAllowNoCurrentUserKey, isAllow);
