// lấy data để trả về controller
import { Injectable } from '@nestjs/common';
import { ColorRepository } from './color.repository';
import { ColorDTO } from './dto/color.dto';
import { IsColorInterface } from './interface/color.interface';
import { GlobalInterface } from 'src/shared/interface/global.interface';
@Injectable()
export class ColorServices {
  constructor(private colorRepo: ColorRepository) {}
  getAllColors(
    color: string,
    page: number,
    limit: number,
  ): Promise<{ data: IsColorInterface[]; currentPage: number }> {
    return this.colorRepo.getAllColors(color, page, limit);
  }

  getOneColor(id: number): Promise<IsColorInterface> {
    return this.colorRepo.getOneColor(id);
  }

  async createColor(data: ColorDTO): Promise<GlobalInterface> {
    const response = await this.colorRepo.createColor(data);
    if (response) {
      return {
        success: true,
        message: 'Created color successfully',
      };
    }
    return {
      success: false,
      message: 'Created color failed',
    };
  }

  async updateColor(data: ColorDTO, id: number): Promise<GlobalInterface> {
    const response = await this.colorRepo.updateColor(data, id);
    if (response.affected === 0) {
      return {
        success: false,
        message: 'Color updated failed',
      };
    }
    return {
      success: true,
      message: 'Color updated successfully',
    };
  }

  async deleteColor(id: number): Promise<any> {
    const response = await this.colorRepo.deleteColor(id);
    if (response.affected !== 0) {
      return {
        success: true,
        message: 'delete color Successfully',
      };
    }
    return {
      success: false,
      message: 'delete color failed',
    };
  }
}
