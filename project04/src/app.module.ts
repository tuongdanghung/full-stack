import { Module } from '@nestjs/common';
import { MysqlModule } from './database/config.module';
import { CategoryModule } from './modules/category/category.module';
import { BrandModule } from './modules/brand/brand.module';
import { RoleModule } from './modules/role/role.module';
import { ColorModule } from './modules/color/color.module';
@Module({
  imports: [MysqlModule, CategoryModule, BrandModule, RoleModule, ColorModule],
})
export class AppModule {}
