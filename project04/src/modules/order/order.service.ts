import { Injectable } from '@nestjs/common';
import { OrderRepository } from './order.repository';
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

  async createOrder(userId: number, data: any): Promise<any> {
    const cartItem = await this.orderRepo.findCart(userId);
    let min = 1000000;
    let max = 9999999;
    let codeOrder = Math.floor(Math.random() * (max - min + 1)) + min;
    const order = {
      userId,
      addressId: +data.addressId,
      paymentId: +data.paymentId,
      shipping: +data.shipping,
      codeOrder,
    };

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
      const res = await this.orderRepo.findProduct(item.productId);
      if (res.stock >= item.quantity) {
        var response = await this.orderRepo.createOrder(order);
        await this.orderRepo.createOrderItem(item);
        await this.orderRepo.updateProduct(
          item.productId,
          res.stock,
          item.quantity,
        );
      } else {
        return {
          success: false,
          message:
            'The quantity purchased is greater than the quantity of product available',
        };
      }
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
      const findOrder = await this.orderRepo.findOrder(id);
      if (findOrder.status === 'Cancel') {
        if (findOrder) {
          const findOrderItem = await this.orderRepo.findOrderItem(
            findOrder.codeOrder,
          );
          for (const item of findOrderItem) {
            const findProduct = await this.orderRepo.findProduct(
              item.product.id,
            );
            await this.orderRepo.updateProductCancelOrder(
              item.product.id,
              findProduct.stock + item.quantity,
            );
          }
        }
      }

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
