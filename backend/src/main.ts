import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';
import { join } from 'path';
import { EntityNotFoundExceptionFilter } from './filters/entity-not-found-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  app.useGlobalFilters(new EntityNotFoundExceptionFilter());

  app.setGlobalPrefix('api/v1');

  app.use(express.static(join(__dirname, '..', 'public')));

  await app.listen(3000, '0.0.0.0');
}
bootstrap();
