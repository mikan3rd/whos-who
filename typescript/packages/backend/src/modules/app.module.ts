import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";

import { DateScalar } from "@/interfaces/scalars/index.scalar";
import { PersonModule } from "@/modules/person.module";
import { PersonSuggestionModule } from "@/modules/personSuggestion.module";
import { PrismaModule } from "@/modules/prisma.module";
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
    UserModule,
    TicketModule,
    PersonModule,
    PersonSuggestionModule,
  ],
  controllers: [],
  providers: [DateScalar],
})
export class AppModule {}
