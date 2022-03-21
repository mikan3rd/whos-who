import { Inject } from "@nestjs/common";
import { Query, Resolver } from "@nestjs/graphql";

import { TopPageDataOutput } from "@/dto/output/topPageData.output";
import { PageDataUsecase } from "@/usecases/pageData.usecase";

@Resolver()
export class PageDataResolver {
  constructor(@Inject(PageDataUsecase) private pageDataUsecase: PageDataUsecase) {}

  @Query((returns) => TopPageDataOutput)
  async getTopPageData(): Promise<TopPageDataOutput> {
    return await this.pageDataUsecase.getTopPageData();
  }
}
