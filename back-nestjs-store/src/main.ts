import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const corsOrigin = configService.get<string>('CORS_ORIGIN');
  
  app.enableCors({
    origin: corsOrigin,
  });
  
  const port = configService.get<number>('PORT') || 3000;
  await app.listen(port);
}
bootstrap();