import { ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderItemEntity } from './entities/orderItem.entity';
import { CartEntity } from '../cart/entities/cart.entity';
import { OrderEntity } from './entities/order.entity';
import { OrderDTO } from './dto/orderItem.dto';
import { ProductEntity } from '../product/entities/product.entity';

export class OrderRepository {
  constructor(
    @InjectRepository(OrderItemEntity)
    public orderItemRepository: Repository<OrderItemEntity>,

    @InjectRepository(CartEntity)
    public cartRepository: Repository<CartEntity>,

    @InjectRepository(OrderEntity)
    public orderRepository: Repository<OrderEntity>,

    @InjectRepository(ProductEntity)
    public productRepository: Repository<ProductEntity>,
  ) {}

  async getAllOrders(codeOrder: string, page: number, limit: number) {
    const skip = (page - 1) * limit;
    const data = await this.orderRepository.find({
      // where: codeOrder && { codeOrder: ILike(`%${codeOrder}%`) },
      // skip,
      // take: limit,
      relations: ['address', 'orderItems'],
    });
    const currentPage = Math.ceil((skip + 1) / limit);
    return { data, currentPage };
  }

  async getAllOrderByUser(
    id: number,
    codeOrder: string,
    page: number,
    limit: number,
  ) {
    const skip = (page - 1) * limit;
    const data = await this.orderRepository.find({
      where: { userId: id },
      // where: codeOrder && { codeOrder: ILike(`%${codeOrder}%`) },
      // skip,
      // take: limit,
      relations: ['address', 'orderItems'],
    });
    const currentPage = Math.ceil((skip + 1) / limit);
    return { data, currentPage };
  }

  async findCart(userId: number) {
    return await this.cartRepository.find({
      where: { userId: userId },
      relations: ['product', 'capacity', 'color'],
    });
  }

  async createOrderItem(orderItem: any) {
    const cartId = orderItem.cartId;
    const data = {
      productId: orderItem.productId,
      capacityId: orderItem.capacityId,
      colorId: orderItem.colorId,
      quantity: orderItem.quantity,
      codeOrder: orderItem.codeOrder,
      total: orderItem.total,
    };
    await this.cartRepository.delete(cartId);
    this.orderItemRepository.create(data);
    return await this.orderItemRepository.save(data);
  }

  async findProduct(id: number) {
    return await this.productRepository.findOneBy({ id });
  }

  async updateProduct(id: number, stock: number, quantity: number) {
    return await this.productRepository.update(id, {
      stock: stock - quantity,
    });
  }

  async createOrder(order: any) {
    const itemOrder = await this.orderRepository.findOneBy({
      codeOrder: order.codeOrder,
    });
    console.log(itemOrder);
    this.orderRepository.create(order);
    return await this.orderRepository.save(order);
  }

  async updateOrder(data: OrderDTO, id: number): Promise<any> {
    return await this.orderRepository.update(id, data);
  }
}
