import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from './product.controller';
import { ProductServices } from './product.service';
import { ProductRepository } from './product.repository';
import { ProductEntity } from './entities/product.entity';
import { ImageEntity } from './entities/image.entity';
import { CloudinaryModule } from 'src/shared/utils/upload/cloudinary.module';
import { ProductCapacityEntity } from './entities/productCapacity.entity';
import { ProductColorEntity } from './entities/productColor.entity';
@Module({
  controllers: [ProductController],
  imports: [
    TypeOrmModule.forFeature([
      ProductEntity,
      ImageEntity,
      ProductRepository,
      ProductCapacityEntity,
      ProductColorEntity,
    ]),
    CloudinaryModule,
  ],
  providers: [ProductServices, ProductRepository],
})
export class ProductModule {}
