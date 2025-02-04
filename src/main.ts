import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { useContainer } from 'class-validator';
import * as process from 'node:process';

async function bootstrap() {
  const port = process.env.PORT || 3000;

  const app = await NestFactory.create<NestFastifyApplication>(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
  });

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.enableCors({
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      transformOptions: { enableImplicitConversion: true },
      stopAtFirstError: true,
    }),
  );

  const logger = new Logger('Bootstrap');
  app.useLogger(logger);

  try {
    await app.listen(port, '0.0.0.0');
    const url = await app.getUrl();
    logger.log(`Server is running on ${url}`);
  } catch (e: any) {
    logger.error(e);
    process.exit(1);
  }
}

bootstrap();
