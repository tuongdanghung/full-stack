import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MysqlModule } from './database/config.module';
import { CategoryModule } from './modules/category/category.module';
@Module({
  imports: [MysqlModule, CategoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
