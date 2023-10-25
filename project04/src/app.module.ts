import { Module } from '@nestjs/common';
import { MysqlModule } from './database/config.module';
import { CategoryModule } from './modules/category/category.module';
import { BrandModule } from './modules/brand/brand.module';
@Module({
  imports: [MysqlModule, CategoryModule, BrandModule],
})
export class AppModule {}
