import { NestFactory } from "@nestjs/core";
import { locale } from "dayjs";
import { Request } from "express";
import admin from "firebase-admin";
import morgan, { token } from "morgan";

import { AppModule } from "@/modules/app.module";

import "dayjs/locale/ja";

locale("ja");

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    // https://stackoverflow.com/a/41044630/1332513
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  }),
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ["debug", "warn", "error"],
  });

  token("graphql-query", (req: Request) => {
    const { body } = req;

    if (body === undefined) {
      return;
    }

    const { operationName, variables } = body;
    if (operationName !== undefined) {
      return `\nOperation Name: ${operationName}\nVariables: ${JSON.stringify(variables)}`;
    }
    return;
  });

  app.use(morgan(":method :url :status :response-time ms :graphql-query"));
  app.enableCors();
  await app.listen(process.env.PORT ?? 3300);
}

bootstrap();
