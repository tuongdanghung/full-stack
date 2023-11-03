import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CapacityController } from './capacity.controller';
import { CapacityServices } from './capacity.service';
import { CapacityRepository } from './capacity.repository';
import { CapacityEntity } from './entities/capacity.entity';
import { GenerateToken } from 'src/shared/middlewares/generateToken';
import { SharedDataService } from 'src/shared/middlewares/shareData.service';
@Module({
  controllers: [CapacityController],
  imports: [TypeOrmModule.forFeature([CapacityEntity, CapacityRepository])],
  providers: [
    CapacityServices,
    CapacityRepository,
    GenerateToken,
    SharedDataService,
  ],
})
export class CapacityModule {}
