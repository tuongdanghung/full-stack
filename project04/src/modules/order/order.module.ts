import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderController } from './order.controller';
import { OrderServices } from './order.service';
import { OrderRepository } from './order.repository';
import { OrderItemEntity } from './entities/orderItem.entity';
import { GenerateToken } from 'src/shared/middlewares/generateToken';
import { SharedDataService } from 'src/shared/middlewares/shareData.service';
import { CartEntity } from '../cart/entities/cart.entity';
import { OrderEntity } from './entities/order.entity';
import { AddressEntity } from '../address/entities/address.entity';
import { ProductEntity } from '../product/entities/product.entity';
@Module({
  controllers: [OrderController],
  imports: [
    TypeOrmModule.forFeature([
      OrderItemEntity,
      OrderEntity,
      OrderRepository,
      CartEntity,
      AddressEntity,
      ProductEntity,
    ]),
  ],
  providers: [
    OrderServices,
    OrderRepository,
    CartEntity,
    GenerateToken,
    SharedDataService,
    OrderEntity,
    OrderItemEntity,
    AddressEntity,
    ProductEntity,
  ],
})
export class OrderModule {}
