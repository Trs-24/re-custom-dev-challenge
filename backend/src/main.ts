import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';
import { join } from 'path';
import { EntityNotFoundExceptionFilter } from './filters/entity-not-found-exception.filter';
import { config } from 'dotenv';
config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  app.useGlobalFilters(new EntityNotFoundExceptionFilter());

  app.setGlobalPrefix('api/v1');

  app.enableCors({
    origin: '*',
    methods: 'GET,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
  });

  app.use(express.static(join(__dirname, '..', 'public')));

  app.use((req, res, next) => {
    if (!req.path.startsWith('/api/')) {
      res.sendFile(join(__dirname, '..', 'public', 'index.html'));
    } else {
      next();
    }
  });

  await app.listen(3000, '0.0.0.0');
}
bootstrap();
