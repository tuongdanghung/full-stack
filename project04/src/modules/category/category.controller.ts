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
import { CategoryServices } from './category.service';
import { CategoryDTO } from '../category/dto/category.dto';
import { IsCategoryInterface } from './interface/category.interface';
import { GlobalInterface } from '../../shared/interface/global.interface';
import { CheckAuthenGuard } from 'src/shared/guards/auth.guard';
import { CheckAuthorGuard } from 'src/shared/guards/verify_role.guard';
dotenv.config();
@Controller(`${process.env.API_KEY}/categories`)
export class CategoryController {
  constructor(private readonly categoryService: CategoryServices) {}
  @Get()
  async getAllCategories(
    @Query('title') title: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(5), ParseIntPipe) limit: number,
  ): Promise<{ data: IsCategoryInterface[]; currentPage: number }> {
    if (!page && !limit) {
      page = 1;
      limit = 5;
    }
    return this.categoryService.getAllCategory(title, page, limit);
  }
  // get all categories

  @Get('/:id')
  getDetailCategory(@Param('id') id: number): Promise<IsCategoryInterface> {
    return this.categoryService.getOneCategory(id);
  }
  // get one categories

  @Post()
  @UseGuards(CheckAuthenGuard)
  @UseGuards(CheckAuthorGuard)
  createCategory(@Body() categoryDTO: CategoryDTO): Promise<GlobalInterface> {
    return this.categoryService.createCategory(categoryDTO);
  }
  // create categories

  @Put('/:id')
  @UseGuards(CheckAuthenGuard)
  @UseGuards(CheckAuthorGuard)
  updateCategory(
    @Body() categoryDTO: CategoryDTO,
    @Param('id') id: number,
  ): Promise<GlobalInterface> {
    return this.categoryService.updateCategory(categoryDTO, id);
  }
  // update categories

  @Delete('/:id')
  @UseGuards(CheckAuthenGuard)
  @UseGuards(CheckAuthorGuard)
  deleteCategory(@Param('id') id: number): Promise<GlobalInterface> {
    return this.categoryService.deleteCategory(id);
  }
  // delete categories
}
