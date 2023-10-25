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

  createColor(data: ColorDTO): Promise<GlobalInterface> {
    return this.colorRepo.createColor(data);
  }

  updateColor(data: ColorDTO, id: number): Promise<GlobalInterface> {
    return this.colorRepo.updateColor(data, id);
  }

  deleteColor(id: number): Promise<GlobalInterface> {
    return this.colorRepo.deleteColor(id);
  }
}
