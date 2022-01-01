import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";

import { PrismaModule } from "@/modules/prisma.module";
import { UserModule } from "@/modules/user.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: "schema.graphql",
      buildSchemaOptions: {
        dateScalarMode: "isoDate",
      },
    }),
    PrismaModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}