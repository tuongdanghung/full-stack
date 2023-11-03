import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryController } from './category.controller';
import { CategoryServices } from './category.service';
import { CategoryRepository } from './category.repository';
import { CategoryEntity } from '../category/entities/category.entity';
import { GenerateToken } from 'src/shared/middlewares/generateToken';
import { SharedDataService } from 'src/shared/middlewares/shareData.service';
@Module({
  controllers: [CategoryController],
  imports: [TypeOrmModule.forFeature([CategoryEntity, CategoryRepository])],
  providers: [
    CategoryServices,
    CategoryRepository,
    GenerateToken,
    SharedDataService,
  ],
})
export class CategoryModule {}
