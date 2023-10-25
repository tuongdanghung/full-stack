// lấy data để trả về controller
import { Injectable } from '@nestjs/common';
import { CategoryEntity } from '../category/entities/category.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryDTO } from './dto/category.dto';
import { IsCategoryInterface } from './interface/category.interface';
import { GlobalInterface } from 'src/shared/interface/global.interface';
@Injectable()
export class CategoryRepository {
  constructor(
    @InjectRepository(CategoryEntity)
    public categoryRepository: Repository<CategoryEntity>,
  ) {}

  getAllCategory(): Promise<IsCategoryInterface[]> {
    return this.categoryRepository.find();
  }

  getOneCategory(id: number): Promise<IsCategoryInterface> {
    return this.categoryRepository.findOneBy({ id });
  }

  async createCategory(data: CategoryDTO): Promise<GlobalInterface> {
    this.categoryRepository.create(data);
    await this.categoryRepository.save(data);
    return {
      success: true,
      message: 'Created category successfully',
    };
  }

  async updateCategory(
    data: CategoryDTO,
    id: number,
  ): Promise<GlobalInterface> {
    const updatedCategory = await this.categoryRepository.update(id, data);
    if (updatedCategory.affected === 0) {
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
    let categoryItem = await this.categoryRepository.findOneBy({ id });
    if (!categoryItem) {
      return {
        success: false,
        message: 'Category not found',
      };
    }

    this.categoryRepository.delete(id);
    return {
      success: true,
      message: 'delete category successfully',
    };
  }
}
