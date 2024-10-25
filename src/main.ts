import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );
  await app.listen(process.env.PORT ?? 8080, () => {
    console.log(
      `Server is running in Mode: ${process.env.NODE_ENV} on Port: ${process.env.PORT ?? 8080}`,
    );
  });
}
bootstrap();
