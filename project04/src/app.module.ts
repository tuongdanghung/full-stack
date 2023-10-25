import { Module } from '@nestjs/common';
import { MysqlModule } from './database/config.module';
import { CategoryModule } from './modules/category/category.module';
@Module({
  imports: [MysqlModule, CategoryModule],
})
export class AppModule {}
