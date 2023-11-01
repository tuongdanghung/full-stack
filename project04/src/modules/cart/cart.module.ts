import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartController } from './cart.controller';
import { CartServices } from './cart.service';
import { CartRepository } from './cart.repository';
import { CartEntity } from './entities/cart.entity';
import { GenerateToken } from 'src/shared/middlewares/generateToken';
import { SharedDataService } from 'src/shared/middlewares/shareData.service';
@Module({
  controllers: [CartController],
  imports: [TypeOrmModule.forFeature([CartEntity, CartRepository])],
  providers: [CartServices, CartRepository, GenerateToken, SharedDataService],
})
export class CartModule {}
