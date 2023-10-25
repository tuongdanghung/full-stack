import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Delete,
  Param,
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
  getAllCategories(): Promise<IsCategoryInterface[]> {
    return this.categoryService.getAllCategory();
  }
  // get all categories

  @Get('/:id')
  getDetailCategory(@Param('id') id: number): Promise<IsCategoryInterface> {
    return this.categoryService.getOneCategory(id);
  }

  @Post()
  createCategory(@Body() categoryDTO: CategoryDTO): Promise<GlobalInterface> {
    return this.categoryService.createCategory(categoryDTO);
  }

  @Put('/:id')
  updateCategory(
    @Body() categoryDTO: CategoryDTO,
    @Param('id') id: number,
  ): Promise<GlobalInterface> {
    return this.categoryService.updateCategory(categoryDTO, id);
  }

  @Delete('/:id')
  deleteCategory(@Param('id') id: number): Promise<GlobalInterface> {
    return this.categoryService.deleteCategory(id);
  }
}
// nhận các request từ client gửi về server
// và nhận response từ server trả về client
