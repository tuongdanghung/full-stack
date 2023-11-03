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
import { GenerateToken } from 'src/shared/middlewares/generateToken';
import { SharedDataService } from 'src/shared/middlewares/shareData.service';
@Module({
  controllers: [ProductController],
  imports: [
    TypeOrmModule.forFeature([
      ProductEntity,
      ImageEntity,
      ProductRepository,
      ProductCapacityEntity,
      ProductColorEntity,
      GenerateToken,
      SharedDataService,
    ]),
    CloudinaryModule,
  ],
  providers: [
    ProductServices,
    ProductRepository,
    GenerateToken,
    SharedDataService,
  ],
})
export class ProductModule {}
