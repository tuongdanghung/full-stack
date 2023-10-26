import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CapacityController } from './capacity.controller';
import { CapacityServices } from './capacity.service';
import { CapacityRepository } from './capacity.repository';
import { CapacityEntity } from './entities/capacity.entity';
@Module({
  controllers: [CapacityController],
  imports: [TypeOrmModule.forFeature([CapacityEntity, CapacityRepository])],
  providers: [CapacityServices, CapacityRepository],
})
export class CapacityModule {}
