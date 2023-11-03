import { AddressEntity } from './entities/address.entity';
import { ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IsAddressInterface } from './interface/address.interface';
import { GlobalInterface } from 'src/shared/interface/global.interface';

export class AddressRepository {
  constructor(
    @InjectRepository(AddressEntity)
    public addressRepository: Repository<AddressEntity>,
  ) {}

  async getAllAddresses(
    province: string,
    page: number,
    limit: number,
  ): Promise<{ data: IsAddressInterface[]; currentPage: number }> {
    const skip = (page - 1) * limit;
    const data = await this.addressRepository.find({
      where: province && { province: ILike(`%${province}%`) },
      skip,
      take: limit,
    });
    const currentPage = Math.ceil((skip + 1) / limit);

    return { data, currentPage };
  }

  async createAddress(data: any): Promise<GlobalInterface> {
    this.addressRepository.create(data);
    const response = await this.addressRepository.save(data);
    return response;
  }

  async updateAddress(data: IsAddressInterface, id: number): Promise<any> {
    return await this.addressRepository.update(id, data);
  }

  async deleteAddress(id: number): Promise<any> {
    let roleItem = await this.addressRepository.findOneBy({ id });
    if (!roleItem) {
      return false;
    }

    return this.addressRepository.delete(id);
  }
}
