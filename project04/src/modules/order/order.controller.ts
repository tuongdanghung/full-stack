import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Query,
  ParseIntPipe,
  DefaultValuePipe,
  UseGuards,
} from '@nestjs/common';
import * as dotenv from 'dotenv';
import { OrderServices } from './order.service';
import { OrderDTO } from './dto/orderItem.dto';
import { GlobalInterface } from '../../shared/interface/global.interface';
import { CheckAuthenGuard } from 'src/shared/guards/auth.guard';
import { SharedDataService } from 'src/shared/middlewares/shareData.service';
dotenv.config();
@Controller(`${process.env.API_KEY}/orders`)
export class OrderController {
  constructor(
    private readonly orderService: OrderServices,
    public sharedDataService: SharedDataService,
  ) {}
  @Get()
  @UseGuards(CheckAuthenGuard)
  async getAllOrders(
    @Query('codeOrder') codeOrder: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(5), ParseIntPipe) limit: number,
  ) {
    if (!page && !limit) {
      page = 1;
      limit = 5;
    }
    return this.orderService.getAllOrders(codeOrder, page, limit);
  }
  // get all order
  @Get('/byUser')
  @UseGuards(CheckAuthenGuard)
  getOrderByUser(
    @Query('codeOrder') codeOrder: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(5), ParseIntPipe) limit: number,
  ) {
    const currentToken = this.sharedDataService.getCurrentToken();
    return this.orderService.getOrderByUser(
      currentToken.dataGenerateToken.id,
      codeOrder,
      page,
      limit,
    );
  }
  // get one order

  @Post()
  @UseGuards(CheckAuthenGuard)
  createOrder(@Body() data: any): Promise<GlobalInterface> {
    const currentToken = this.sharedDataService.getCurrentToken();
    return this.orderService.createOrder(
      currentToken.dataGenerateToken.id,
      data,
    );
  }
  // create orderItem

  @Put('/:id')
  @UseGuards(CheckAuthenGuard)
  updateOrder(
    @Body() status: OrderDTO,
    @Param('id') id: number,
  ): Promise<GlobalInterface> {
    return this.orderService.updateOrder(status, id);
  }
  // update orderItem
}
