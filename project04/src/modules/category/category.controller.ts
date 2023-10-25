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
import { CategoryServices } from './category.service';
import { CategoryDTO } from '../category/dto/category.dto';
import { IsCategoryInterface } from './interface/category.interface';
import { GlobalInterface } from '../../shared/interface/global.interface';

// trong global class có bao nhiêu tham số thì ở đây truyền bấy nhiêu tham số
dotenv.config();
@Controller(`${process.env.API_KEY}/category`)
export class CategoryController {
  constructor(private readonly categoryService: CategoryServices) {}
  @Get()
  async getAllCategories(
    @Query('title') title: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(2), ParseIntPipe) limit: number,
  ): Promise<{ data: IsCategoryInterface[]; currentPage: number }> {
    if (!page && !limit) {
      page = 1;
      limit = 2;
    }
    return this.categoryService.getAllCategory(title, page, limit);
  }
  // get all categories

  @Get('/:id')
  getDetailCategory(@Param('id') id: number): Promise<IsCategoryInterface> {
    console.log();

    return this.categoryService.getOneCategory(id);
  }
  // get one categories

  @Post()
  createCategory(@Body() categoryDTO: CategoryDTO): Promise<GlobalInterface> {
    return this.categoryService.createCategory(categoryDTO);
  }
  // create categories

  @Put('/:id')
  updateCategory(
    @Body() categoryDTO: CategoryDTO,
    @Param('id') id: number,
  ): Promise<GlobalInterface> {
    return this.categoryService.updateCategory(categoryDTO, id);
  }
  // update categories

  @Delete('/:id')
  deleteCategory(@Param('id') id: number): Promise<GlobalInterface> {
    return this.categoryService.deleteCategory(id);
  }
  // delete categories
}
// nhận các request từ client gửi về server
// và nhận response từ server trả về client
