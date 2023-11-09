// lấy data để trả về controller
import { ColorEntity } from './entities/color.entity';
import { ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ColorDTO } from './dto/color.dto';
import { IsColorInterface } from './interface/color.interface';
import { GlobalInterface } from 'src/shared/interface/global.interface';
import { ProductColorEntity } from '../product/entities/productColor.entity';

export class ColorRepository {
  constructor(
    @InjectRepository(ColorEntity)
    public colorRepository: Repository<ColorEntity>,
    @InjectRepository(ProductColorEntity)
    public productColorEntity: Repository<ProductColorEntity>,
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
    });
    const currentPage = Math.ceil((skip + 1) / limit);

    return { data, currentPage };
  }

  getOneColor(id: number): Promise<IsColorInterface> {
    return this.colorRepository.findOneBy({ id });
  }

  async createColor(data: ColorDTO): Promise<any> {
    this.colorRepository.create(data);
    return await this.colorRepository.save(data);
  }

  async updateColor(data: ColorDTO, id: number): Promise<any> {
    return await this.colorRepository.update(id, data);
  }

  async deleteColor(id: number): Promise<any> {
    let colorItem = await this.colorRepository.findOneBy({ id });
    if (colorItem !== null) {
      await this.productColorEntity.delete({ colorsId: id });
      return await this.colorRepository.delete(id);
    }
  }
}
