import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryController } from './category.controller';
import { CategoryServices } from './category.service';
import { CategoryRepository } from './category.repository';
import { CategoryEntity } from '../category/entities/category.entity';
@Module({
  controllers: [CategoryController],
  imports: [TypeOrmModule.forFeature([CategoryEntity, CategoryRepository])],
  providers: [CategoryServices, CategoryRepository],
})
export class CategoryModule {}
