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

  async getAllAddresses(id: number): Promise<{ data: IsAddressInterface[] }> {
    const data = await this.addressRepository.find({
      where: { userId: id },
    });

    return { data };
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
