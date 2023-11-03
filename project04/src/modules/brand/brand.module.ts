import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandController } from './brand.controller';
import { BrandServices } from './brand.service';
import { BrandRepository } from './brand.repository';
import { BrandEntity } from './entities/brand.entity';
import { GenerateToken } from 'src/shared/middlewares/generateToken';
import { SharedDataService } from 'src/shared/middlewares/shareData.service';
@Module({
  controllers: [BrandController],
  imports: [TypeOrmModule.forFeature([BrandEntity, BrandRepository])],
  providers: [BrandServices, BrandRepository, GenerateToken, SharedDataService],
})
export class BrandModule {}
