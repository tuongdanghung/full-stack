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

  async createBrand(data: BrandDTO): Promise<GlobalInterface> {
    const response = await this.brandRepo.createBrand(data);
    if (response) {
      return {
        success: true,
        message: 'Created brand successfully',
      };
    }
    return {
      success: false,
      message: 'Created brand failed',
    };
  }

  async updateBrand(data: BrandDTO, id: number): Promise<GlobalInterface> {
    const updatedBrand = await this.brandRepo.updateBrand(data, id);
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
    const brandItem = await this.brandRepo.deleteBrand(id);
    if (brandItem.affected === 0) {
      return {
        success: false,
        message: 'Brand not found',
      };
    }
    return {
      success: true,
      message: 'Delete brand successfully',
    };
  }
}
