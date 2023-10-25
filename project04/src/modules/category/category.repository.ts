// lấy data để trả về controller
import { CategoryEntity } from '../category/entities/category.entity';
import { ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryDTO } from './dto/category.dto';
import { IsCategoryInterface } from './interface/category.interface';
import { GlobalInterface } from 'src/shared/interface/global.interface';

export class CategoryRepository {
  constructor(
    @InjectRepository(CategoryEntity)
    public categoryRepository: Repository<CategoryEntity>,
  ) {}

  async getAllCategory(
    title: string,
    page: number,
    limit: number,
  ): Promise<{ data: IsCategoryInterface[]; currentPage: number }> {
    const skip = (page - 1) * limit;
    const data = await this.categoryRepository.find({
      where: title && { title: ILike(`%${title}%`) },
      skip,
      take: limit,
    });
    const currentPage = Math.ceil((skip + 1) / limit);

    return { data, currentPage };
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
      message: 'Delete category successfully',
    };
  }
}
