// lấy data để trả về controller
import { ColorEntity } from './entities/color.entity';
import { ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ColorDTO } from './dto/color.dto';
import { IsColorInterface } from './interface/color.interface';
import { GlobalInterface } from 'src/shared/interface/global.interface';

export class ColorRepository {
  constructor(
    @InjectRepository(ColorEntity)
    public colorRepository: Repository<ColorEntity>,
  ) {}

  async getAllColors(
    color: string,
    page: number,
    limit: number,
  ): Promise<{ data: IsColorInterface[]; currentPage: number }> {
    const skip = (page - 1) * limit;
    const data = await this.colorRepository.find({
      where: color && { color: ILike(`%${color}%`) },
      skip,
      take: limit,
    });
    const currentPage = Math.ceil((skip + 1) / limit);

    return { data, currentPage };
  }

  getOneColor(id: number): Promise<IsColorInterface> {
    return this.colorRepository.findOneBy({ id });
  }

  async createColor(data: ColorDTO): Promise<GlobalInterface> {
    this.colorRepository.create(data);
    await this.colorRepository.save(data);
    return {
      success: true,
      message: 'Created color successfully',
    };
  }

  async updateColor(data: ColorDTO, id: number): Promise<GlobalInterface> {
    const updatedColor = await this.colorRepository.update(id, data);
    if (updatedColor.affected === 0) {
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

  async deleteColor(id: number): Promise<GlobalInterface> {
    let colorItem = await this.colorRepository.findOneBy({ id });
    if (!colorItem) {
      return {
        success: false,
        message: 'Color not found',
      };
    }

    this.colorRepository.delete(id);
    return {
      success: true,
      message: 'Delete color successfully',
    };
  }
}
