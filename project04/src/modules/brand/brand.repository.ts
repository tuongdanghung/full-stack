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

  async createBrand(data: BrandDTO): Promise<any> {
    this.brandRepository.create(data);
    return await this.brandRepository.save(data);
  }

  async updateBrand(data: BrandDTO, id: number): Promise<any> {
    return await this.brandRepository.update(id, data);
  }

  async deleteBrand(id: number): Promise<any> {
    return await this.brandRepository.delete(id);
  }
}
