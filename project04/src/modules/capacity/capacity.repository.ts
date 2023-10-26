// lấy data để trả về controller
import { CapacityEntity } from './entities/capacity.entity';
import { Equal, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CapacityDTO } from './dto/capacity.dto';
import { IsCapacityInterface } from './interface/capacity.interface';
import { GlobalInterface } from 'src/shared/interface/global.interface';

export class CapacityRepository {
  constructor(
    @InjectRepository(CapacityEntity)
    public capacityRepository: Repository<CapacityEntity>,
  ) {}

  async getAllCapacities(
    size: number,
    page: number,
    limit: number,
  ): Promise<{ data: IsCapacityInterface[]; currentPage: number }> {
    const skip = (page - 1) * limit;
    const data = await this.capacityRepository.find({
      where: size ? { size: Equal(size) } : {},
      skip,
      take: limit,
    });
    const currentPage = Math.ceil((skip + 1) / limit);

    return { data, currentPage };
  }

  getOneCapacity(id: number): Promise<IsCapacityInterface> {
    return this.capacityRepository.findOneBy({ id });
  }

  async createCapacity(data: CapacityDTO): Promise<CapacityDTO> {
    this.capacityRepository.create(data);
    const response = await this.capacityRepository.save(data);
    return response;
  }

  async updateCapacity(
    data: CapacityDTO,
    id: number,
  ): Promise<IsCapacityInterface> {
    const updatedCapacity = await this.capacityRepository.update(id, data);
    return updatedCapacity;
  }

  async deleteCapacity(id: number): Promise<IsCapacityInterface> {
    let capacityItem = await this.capacityRepository.findOneBy({ id });
    if (!capacityItem) {
      return capacityItem;
    }
    const data = await this.capacityRepository.delete(id);
    return data;
  }
}
