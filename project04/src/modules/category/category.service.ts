// lấy data để trả về controller
import { Injectable } from '@nestjs/common';
import { CategoryRepository } from './category.repository';
import { CategoryDTO } from './dto/category.dto';
import { IsCategoryInterface } from './interface/category.interface';
import { GlobalInterface } from 'src/shared/interface/global.interface';
@Injectable()
export class CategoryServices {
  constructor(private categoryRepo: CategoryRepository) {}
  getAllCategory(
    title: string,
    page: number,
    limit: number,
  ): Promise<{ data: IsCategoryInterface[]; currentPage: number }> {
    return this.categoryRepo.getAllCategory(title, page, limit);
  }

  getOneCategory(id: number): Promise<IsCategoryInterface> {
    return this.categoryRepo.getOneCategory(id);
  }

  createCategory(data: CategoryDTO): Promise<GlobalInterface> {
    return this.categoryRepo.createCategory(data);
  }

  updateCategory(data: CategoryDTO, id: number): Promise<GlobalInterface> {
    return this.categoryRepo.updateCategory(data, id);
  }

  deleteCategory(id: number): Promise<GlobalInterface> {
    return this.categoryRepo.deleteCategory(id);
  }
}
