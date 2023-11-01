import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Put,
  Delete,
  Param,
  Query,
  ParseIntPipe,
  DefaultValuePipe,
} from '@nestjs/common';
import * as dotenv from 'dotenv';
import { CartServices } from './cart.service';
import { CartDTO } from './dto/cart.dto';
import { ISCartInterface } from './interface/cart.interface';
import { GlobalInterface } from '../../shared/interface/global.interface';
import { CheckAuthenGuard } from 'src/shared/guards/auth.guard';
import { SharedDataService } from 'src/shared/middlewares/shareData.service';

dotenv.config();
@Controller(`${process.env.API_KEY}/carts`)
export class CartController {
  constructor(
    private readonly cartService: CartServices,
    public sharedDataService: SharedDataService,
  ) {}
  @Get()
  @UseGuards(CheckAuthenGuard)
  async getAllCarts() {
    const currentToken = this.sharedDataService.getCurrentToken();
    return this.cartService.getAllCart(currentToken.dataGenerateToken.id);
  }
  // get all cart
  @Post()
  @UseGuards(CheckAuthenGuard)
  createCart(@Body() cartDTO: CartDTO): Promise<GlobalInterface> {
    const currentToken = this.sharedDataService.getCurrentToken();
    const cart = {
      ...cartDTO,
      userId: currentToken.dataGenerateToken.id,
    };
    return this.cartService.createCart(cart);
  }
  // create cart
  @Put('/:id')
  updateCategory(
    @Body() cartData: ISCartInterface,
    @Param('id') id: number,
  ): Promise<GlobalInterface> {
    return this.cartService.updateCategory(cartData, id);
  }
  // update cart
  @Delete('/:id')
  @UseGuards(CheckAuthenGuard)
  deleteCart(@Param('id') id: number) {
    return this.cartService.deleteCart(id);
  }
  // delete cart
}
// nhận các request từ client gửi về server
// và nhận response từ server trả về client
