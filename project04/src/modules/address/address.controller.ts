import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Delete,
  Param,
  Query,
  ParseIntPipe,
  DefaultValuePipe,
  UseGuards,
} from '@nestjs/common';
import * as dotenv from 'dotenv';
import { AddressServices } from './address.service';
import { AddressDTO } from './dto/address.dto';
import { IsAddressInterface } from './interface/address.interface';
import { GlobalInterface } from '../../shared/interface/global.interface';
import { SharedDataService } from 'src/shared/middlewares/shareData.service';
import { CheckAuthenGuard } from 'src/shared/guards/auth.guard';

dotenv.config();
@Controller(`${process.env.API_KEY}/addresses`)
export class AddressController {
  constructor(
    private readonly addressService: AddressServices,
    private sharedDataService: SharedDataService,
  ) {}
  @Get()
  @UseGuards(CheckAuthenGuard)
  async getAllAddresses(
    @Query('province') province: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(5), ParseIntPipe) limit: number,
  ): Promise<{ data: IsAddressInterface[]; currentPage: number }> {
    if (!page && !limit) {
      page = 1;
      limit = 5;
    }
    return this.addressService.getAllAddresses(province, page, limit);
  }
  // get all address

  @Post()
  @UseGuards(CheckAuthenGuard)
  createAddress(@Body() addressDTO: AddressDTO): Promise<GlobalInterface> {
    const currentToken = this.sharedDataService.getCurrentToken();
    const data = { ...addressDTO, userId: currentToken.dataGenerateToken.id };
    return this.addressService.createAddress(data);
  }
  // create address

  @Put('/:id')
  @UseGuards(CheckAuthenGuard)
  updateAddress(
    @Body() address: IsAddressInterface,
    @Param('id') id: number,
  ): Promise<GlobalInterface> {
    return this.addressService.updateAddress(address, id);
  }
  // update address
  @Delete('/:id')
  @UseGuards(CheckAuthenGuard)
  deleteServices(@Param('id') id: number): Promise<GlobalInterface> {
    return this.addressService.deleteAddress(id);
  }
  // delete address
}
