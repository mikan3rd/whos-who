import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";

import { ContextType } from "@/interfaces/guards/gqlAuthGuard.guard";

export type CurrentUserType = {
  currentUser: ContextType["currentUser"];
  decodedIdToken: ContextType["decodedIdToken"];
};

export const CurrentUser = createParamDecorator<unknown, ExecutionContext>((data, context) => {
  const { currentUser, decodedIdToken } = GqlExecutionContext.create(context).getContext<ContextType>();
  const params: CurrentUserType = { currentUser, decodedIdToken };
  return params;
});
