import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT_URL || 6000;
  await app.listen(PORT, () => console.log(`listening on port ${PORT}`));
}
bootstrap();
