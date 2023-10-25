import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandController } from './brand.controller';
import { BrandServices } from './brand.service';
import { BrandRepository } from './brand.repository';
import { BrandEntity } from './entities/brand.entity';
@Module({
  controllers: [BrandController],
  imports: [TypeOrmModule.forFeature([BrandEntity, BrandRepository])],
  providers: [BrandServices, BrandRepository],
})
export class BrandModule {}
