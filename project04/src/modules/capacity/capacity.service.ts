// lấy data để trả về controller
import { Injectable } from '@nestjs/common';
import { CapacityRepository } from './capacity.repository';
import { CapacityDTO } from './dto/capacity.dto';
import { IsCapacityInterface } from './interface/capacity.interface';
import { GlobalInterface } from 'src/shared/interface/global.interface';
@Injectable()
export class CapacityServices {
  constructor(private capacityRepo: CapacityRepository) {}
  getAllCapacities(
    size: number,
    page: number,
    limit: number,
  ): Promise<{ data: IsCapacityInterface[]; currentPage: number }> {
    return this.capacityRepo.getAllCapacities(size, page, limit);
  }

  getOneCapacity(id: number): Promise<IsCapacityInterface> {
    return this.capacityRepo.getOneCapacity(id);
  }

  async createCapacity(data: CapacityDTO): Promise<GlobalInterface> {
    const response = this.capacityRepo.createCapacity(data);
    if (response) {
      return {
        success: true,
        message: 'Created capacity successfully',
      };
    }
    return {
      success: false,
      message: 'Failed to create capacity',
    };
  }

  async updateCapacity(
    data: CapacityDTO,
    id: number,
  ): Promise<GlobalInterface> {
    const response = await this.capacityRepo.updateCapacity(data, id);
    if (response.affected === 0) {
      return {
        success: false,
        message: 'Capacity updated failed',
      };
    }
    return {
      success: true,
      message: 'Capacity updated successfully',
    };
  }

  async deleteCapacity(id: number): Promise<GlobalInterface> {
    const response = await this.capacityRepo.deleteCapacity(id);
    if (response === null) {
      return {
        success: true,
        message: 'Delete capacity failed',
      };
    }
    return {
      success: true,
      message: 'Delete capacity successfully',
    };
  }
}
