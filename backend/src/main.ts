import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { TskvLogger } from './logger/tskv.logger';
import { DevLogger, JsonLogger } from './logger/logger.service';

async function bootstrap() {
  const env = process.env.LOGGER_FORMAT || process.env.NODE_ENV;
  const loggerMap = {
    production: () => new JsonLogger(),
    tskv: () => new TskvLogger(),
    default: () => new DevLogger(),
  };
  const logger = (
    loggerMap[env as keyof typeof loggerMap] || loggerMap.default
  )();
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.setGlobalPrefix('api/afisha');
  app.enableCors();
  app.useLogger(logger);
  await app.listen(3000);
}
bootstrap();
