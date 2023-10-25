import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Delete,
  Param,
  ValidationPipe,
} from '@nestjs/common';
import { CategoryServices } from './category.service';
import { CategoryDTO } from '../category/dto/category.dto';
// trong global class có bao nhiêu tham số thì ở đây truyền bấy nhiêu tham số
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryServices) {}
  @Get()
  getAllCategories() {
    return this.categoryService.getAllCategory();
  }
  // get all categories

  @Get('/:id')
  getDetailCategory(@Param('id') id: number) {
    console.log(id);
    return this.categoryService.getOneCategory(id);
  }

  @Post()
  createCategory(@Body(new ValidationPipe()) categoryDTO: CategoryDTO) {
    return this.categoryService.createCategory(categoryDTO);
  }

  @Put('/:id')
  updateCategory(
    @Body(new ValidationPipe()) categoryDTO: CategoryDTO,
    @Param('id') id: number,
  ) {
    return this.categoryService.updateCategory(categoryDTO, id);
  }

  @Delete('/:id')
  deleteCategory(@Param('id') id: number) {
    return this.categoryService.deleteCategory(id);
  }
}
// nhận các request từ client gửi về server
// và nhận response từ server trả về client
