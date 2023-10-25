// lấy data để trả về controller
import { BrandEntity } from './entities/brand.entity';
import { ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BrandDTO } from './dto/brand.dto';
import { IsBrandInterface } from './interface/brand.interface';
import { GlobalInterface } from 'src/shared/interface/global.interface';

export class BrandRepository {
  constructor(
    @InjectRepository(BrandEntity)
    public brandRepository: Repository<BrandEntity>,
  ) {}

  async getAllBrands(
    title: string,
    page: number,
    limit: number,
  ): Promise<{ data: IsBrandInterface[]; currentPage: number }> {
    const skip = (page - 1) * limit;
    const data = await this.brandRepository.find({
      where: title && { title: ILike(`%${title}%`) },
      skip,
      take: limit,
    });
    const currentPage = Math.ceil((skip + 1) / limit);

    return { data, currentPage };
  }

  getOneBrand(id: number): Promise<IsBrandInterface> {
    return this.brandRepository.findOneBy({ id });
  }

  async createBrand(data: BrandDTO): Promise<GlobalInterface> {
    this.brandRepository.create(data);
    await this.brandRepository.save(data);
    return {
      success: true,
      message: 'Created brand successfully',
    };
  }

  async updateBrand(data: BrandDTO, id: number): Promise<GlobalInterface> {
    const updatedBrand = await this.brandRepository.update(id, data);
    if (updatedBrand.affected === 0) {
      return {
        success: false,
        message: 'Brand updated failed',
      };
    }
    return {
      success: true,
      message: 'Brand updated successfully',
    };
  }

  async deleteBrand(id: number): Promise<GlobalInterface> {
    let brandItem = await this.brandRepository.findOneBy({ id });
    if (!brandItem) {
      return {
        success: false,
        message: 'Brand not found',
      };
    }

    this.brandRepository.delete(id);
    return {
      success: true,
      message: 'Delete brand successfully',
    };
  }
}
