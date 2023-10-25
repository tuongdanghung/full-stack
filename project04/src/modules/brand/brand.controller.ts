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
} from '@nestjs/common';
import * as dotenv from 'dotenv';
import { BrandServices } from './brand.service';
import { BrandDTO } from './dto/brand.dto';
import { IsBrandInterface } from './interface/brand.interface';
import { GlobalInterface } from '../../shared/interface/global.interface';

// trong global class có bao nhiêu tham số thì ở đây truyền bấy nhiêu tham số
dotenv.config();
@Controller(`${process.env.API_KEY}/brands`)
export class BrandController {
  constructor(private readonly brandService: BrandServices) {}
  @Get()
  async getAllBrands(
    @Query('title') title: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(5), ParseIntPipe) limit: number,
  ): Promise<{ data: IsBrandInterface[]; currentPage: number }> {
    if (!page && !limit) {
      page = 1;
      limit = 5;
    }
    return this.brandService.getAllBrands(title, page, limit);
  }
  // get all brand

  @Get('/:id')
  getDetailBrand(@Param('id') id: number): Promise<IsBrandInterface> {
    return this.brandService.getOneBrand(id);
  }
  // get one brand

  @Post()
  createBrand(@Body() brandDTO: BrandDTO): Promise<GlobalInterface> {
    return this.brandService.createBrand(brandDTO);
  }
  // create brand

  @Put('/:id')
  updateBrand(
    @Body() brandDTO: BrandDTO,
    @Param('id') id: number,
  ): Promise<GlobalInterface> {
    return this.brandService.updateBrand(brandDTO, id);
  }
  // update brand

  @Delete('/:id')
  deleteBrand(@Param('id') id: number): Promise<GlobalInterface> {
    return this.brandService.deleteBrand(id);
  }
  // delete brand
}
// nhận các request từ client gửi về server
// và nhận response từ server trả về client
