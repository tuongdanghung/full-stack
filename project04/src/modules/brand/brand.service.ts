// lấy data để trả về controller
import { Injectable } from '@nestjs/common';
import { BrandRepository } from './brand.repository';
import { BrandDTO } from './dto/brand.dto';
import { IsBrandInterface } from './interface/brand.interface';
import { GlobalInterface } from 'src/shared/interface/global.interface';
@Injectable()
export class BrandServices {
  constructor(private brandRepo: BrandRepository) {}
  getAllBrands(
    title: string,
    page: number,
    limit: number,
  ): Promise<{ data: IsBrandInterface[]; currentPage: number }> {
    return this.brandRepo.getAllBrands(title, page, limit);
  }

  getOneBrand(id: number): Promise<IsBrandInterface> {
    return this.brandRepo.getOneBrand(id);
  }

  createBrand(data: BrandDTO): Promise<GlobalInterface> {
    return this.brandRepo.createBrand(data);
  }

  updateBrand(data: BrandDTO, id: number): Promise<GlobalInterface> {
    return this.brandRepo.updateBrand(data, id);
  }

  deleteBrand(id: number): Promise<GlobalInterface> {
    return this.brandRepo.deleteBrand(id);
  }
}
