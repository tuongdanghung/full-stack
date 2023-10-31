import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressController } from './address.controller';
import { AddressServices } from './address.service';
import { AddressRepository } from './address.repository';
import { GenerateToken } from '../../shared/middlewares/generateToken';
import { AddressEntity } from './entities/address.entity';
import { SharedDataService } from 'src/shared/middlewares/shareData.service';
@Module({
  controllers: [AddressController],
  imports: [TypeOrmModule.forFeature([AddressEntity, AddressRepository])],
  providers: [
    AddressServices,
    AddressRepository,
    GenerateToken,
    SharedDataService,
  ],
})
export class AddressModule {}
