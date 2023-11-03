import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColorController } from './color.controller';
import { ColorServices } from './color.service';
import { ColorRepository } from './color.repository';
import { ColorEntity } from './entities/color.entity';
import { ProductColorEntity } from '../product/entities/productColor.entity';
import { GenerateToken } from 'src/shared/middlewares/generateToken';
import { SharedDataService } from 'src/shared/middlewares/shareData.service';
@Module({
  controllers: [ColorController],
  imports: [
    TypeOrmModule.forFeature([
      ColorEntity,
      ColorRepository,
      ProductColorEntity,
    ]),
  ],
  providers: [
    ColorServices,
    ColorRepository,
    ProductColorEntity,
    GenerateToken,
    SharedDataService,
  ],
})
export class ColorModule {}
