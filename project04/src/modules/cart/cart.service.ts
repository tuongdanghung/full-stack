// lấy data để trả về controller
import { Injectable } from '@nestjs/common';
import { CartRepository } from './cart.repository';
// import { CategoryDTO } from './dto/category.dto';
// import { IsCategoryInterface } from './interface/category.interface';
import { GlobalInterface } from 'src/shared/interface/global.interface';
import { CartDTO } from './dto/cart.dto';
import { ISCartInterface } from './interface/cart.interface';
@Injectable()
export class CartServices {
  constructor(private cartRepo: CartRepository) {}
  getAllCart(id: number) {
    return this.cartRepo.getAllCart(id);
  }
  async createCart(data: CartDTO): Promise<GlobalInterface> {
    const response = await this.cartRepo.createCart(data);
    if (response) {
      return {
        success: true,
        message: 'Add to cart Successfully',
      };
    }
    return {
      success: false,
      message: 'Add to cart failed',
    };
  }
  async updateCategory(
    data: ISCartInterface,
    id: number,
  ): Promise<GlobalInterface> {
    const response = await this.cartRepo.updateCategory(data, id);
    if (response.affected !== 0) {
      return {
        success: true,
        message: 'update cart Successfully',
      };
    }
    return {
      success: false,
      message: 'update cart failed',
    };
  }
  async deleteCart(id: number) {
    const response = await this.cartRepo.deleteCart(id);
    if (response.affected !== 0) {
      return {
        success: true,
        message: 'delete cart Successfully',
      };
    }
    return {
      success: false,
      message: 'delete cart failed',
    };
  }
}
