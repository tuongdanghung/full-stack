import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CartEntity } from './entities/cart.entity';
import { CartDTO } from './dto/cart.dto';
import { ISCartInterface } from './interface/cart.interface';

export class CartRepository {
  constructor(
    @InjectRepository(CartEntity)
    public cartRepository: Repository<CartEntity>,
  ) {}
  async getAllCart(userId: number) {
    const data = await this.cartRepository.find({
      where: { userId },
      relations: ['product', 'capacity', 'color'],
    });
    return data;
  }
  async createCart(data: ISCartInterface): Promise<any> {
    const cartItem = await this.cartRepository.findOne({
      where: {
        userId: data.userId,
        productId: data.productId,
        colorId: data.colorId,
        capacityId: data.capacityId,
      },
    });
    if (cartItem === null) {
      this.cartRepository.create(data);
      return await this.cartRepository.save(data);
    }
  }
  async updateCategory(data: ISCartInterface, id: number): Promise<any> {
    return await this.cartRepository.update(id, data);
  }
  async deleteCart(id: number): Promise<any> {
    return this.cartRepository.delete(id);
  }
}
