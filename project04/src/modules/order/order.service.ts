// lấy data để trả về controller
import { Injectable } from '@nestjs/common';
import { OrderRepository } from './order.repository';
// import { RoleDTO } from './dto/role.dto';
// import { IsRoleInterface } from './interface/role.interface';
import { GlobalInterface } from 'src/shared/interface/global.interface';
import { OrderDTO } from './dto/orderItem.dto';
@Injectable()
export class OrderServices {
  constructor(private orderRepo: OrderRepository) {}
  getAllOrders(codeOrder: string, page: number, limit: number) {
    return this.orderRepo.getAllOrders(codeOrder, page, limit);
  }

  getOrderByUser(id: number, codeOrder: string, page: number, limit: number) {
    return this.orderRepo.getAllOrderByUser(id, codeOrder, page, limit);
  }

  async createOrder(userId: number): Promise<any> {
    const cartItem = await this.orderRepo.findCart(userId);

    let min = 1000000;
    let max = 9999999;

    let codeOrder = Math.floor(Math.random() * (max - min + 1)) + min;

    const order = {
      userId,
      addressId: 2,
      paymentId: 1,
      codeOrder,
    };
    const response = await this.orderRepo.createOrder(order);

    let orderItem = cartItem.map((item) => ({
      cartId: item.id,
      productId: item.productId,
      capacityId: item.capacityId,
      colorId: item.colorId,
      quantity: item.quantity,
      codeOrder,
      total: item.product.price * item.capacity.percent * item.quantity,
    }));

    for (const item of orderItem) {
      await this.orderRepo.createOrderItem(item);
      await this.orderRepo.updateProduct(item.productId, item.quantity);
    }

    if (response) {
      return {
        success: true,
        message: 'Order created successfully',
      };
    }
    return {
      success: false,
      message: 'Order created failed',
    };
  }

  async updateOrder(data: OrderDTO, id: number): Promise<GlobalInterface> {
    const response = await this.orderRepo.updateOrder(data, id);
    if (response.affected !== 0) {
      return {
        success: true,
        message: 'Order updated successfully',
      };
    }
    return {
      success: false,
      message: 'Order updated failed',
    };
  }
}
