import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import helmet from 'helmet';

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');

  app.use(helmet());

  app.enableCors({
    origin:      process.env.FRONTEND_URL ?? 'http://localhost:5173',
    methods:     ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true
  });

  app.useGlobalPipes(
      new ValidationPipe({
        whitelist:            true,
        forbidNonWhitelisted: true,
        transform:            true
      })
  );

  const port = process.env.PORT ?? 3000;
  await app.listen(port);

  logger.log(`🚀 CareerPulse API is running on: http://localhost:${port}/api/v1`);
  logger.log(`📊 Prisma Studio available via: npx prisma studio`);
}
bootstrap();