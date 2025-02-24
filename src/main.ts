import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as cookieParser from 'cookie-parser';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(cookieParser());
  app.setBaseViewsDir(join(__dirname, '..', 'views')); 
  app.setViewEngine('ejs');
  await app.listen(2500);
  console.log('Server is running on http://localhost:2500');
}
bootstrap();