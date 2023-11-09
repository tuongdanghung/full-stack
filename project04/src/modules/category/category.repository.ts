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
    });
    const currentPage = Math.ceil((skip + 1) / limit);

    return { data, currentPage };
  }

  getOneCategory(id: number): Promise<IsCategoryInterface> {
    return this.categoryRepository.findOneBy({ id });
  }

  async createCategory(data: CategoryDTO): Promise<any> {
    this.categoryRepository.create(data);
    return await this.categoryRepository.save(data);
  }

  async updateCategory(data: CategoryDTO, id: number): Promise<any> {
    return await this.categoryRepository.update(id, data);
  }

  async deleteCategory(id: number): Promise<any> {
    return await this.categoryRepository.delete(id);
  }
}
