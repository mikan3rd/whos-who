import { MiddlewareConsumer, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { graphqlUploadExpress } from "graphql-upload";

import { DateScalar } from "@/interfaces/scalars/index.scalar";
import { PersonModule } from "@/modules/person.module";
import { PersonSuggestionModule } from "@/modules/personSuggestion.module";
import { PersonSuggestionLikeModule } from "@/modules/personSuggestionLike.module";
import { PrismaModule } from "@/modules/prisma.module";
import { StorageModule } from "@/modules/storage.module";
import { TicketModule } from "@/modules/ticket.module";
import { UserModule } from "@/modules/user.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: "schema.graphql",
    }),
    PrismaModule,
    StorageModule,
    UserModule,
    TicketModule,
    PersonModule,
    PersonSuggestionModule,
    PersonSuggestionLikeModule,
  ],
  controllers: [],
  providers: [DateScalar],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(graphqlUploadExpress()).forRoutes("graphql");
  }
}
