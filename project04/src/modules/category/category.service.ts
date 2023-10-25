// lấy data để trả về controller
import { Injectable } from '@nestjs/common';
import { CategoryRepository } from './category.repository';
import { CategoryDTO } from './dto/category.dto';

@Injectable()
export class CategoryServices {
  constructor(private categoryRepo: CategoryRepository) {}
  getAllCategory() {
    return this.categoryRepo.getAllCategory();
  }

  getOneCategory(id: number) {
    return this.categoryRepo.getOneCategory(id);
  }

  createCategory(data: CategoryDTO) {
    return this.categoryRepo.createCategory(data);
  }

  updateCategory(data: CategoryDTO, id: number) {
    return this.categoryRepo.updateCategory(data, id);
  }

  deleteCategory(id: number) {
    return this.categoryRepo.deleteCategory(id);
  }
}
