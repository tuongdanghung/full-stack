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

  async createCategory(data: CategoryDTO): Promise<GlobalInterface> {
    const response = await this.categoryRepo.createCategory(data);
    if (response) {
      return {
        success: true,
        message: 'Created category successfully',
      };
    } else {
      return {
        success: false,
        message: 'Created category failed',
      };
    }
  }

  async updateCategory(
    data: CategoryDTO,
    id: number,
  ): Promise<GlobalInterface> {
    const response = await this.categoryRepo.updateCategory(data, id);
    if (response.affected === 0) {
      return {
        success: false,
        message: 'Category updated failed',
      };
    }
    return {
      success: true,
      message: 'Category updated successfully',
    };
  }

  async deleteCategory(id: number): Promise<GlobalInterface> {
    const response = await this.categoryRepo.deleteCategory(id);
    if (response.affected === 0) {
      return {
        success: false,
        message: 'Category delete failed',
      };
    }
    return {
      success: true,
      message: 'Category delete successfully',
    };
  }
}
