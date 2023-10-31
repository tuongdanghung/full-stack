// lấy data để trả về controller
import { Injectable } from '@nestjs/common';
import { AddressRepository } from './address.repository';
import { AddressDTO } from './dto/address.dto';
import { IsAddressInterface } from './interface/address.interface';
import { GlobalInterface } from 'src/shared/interface/global.interface';
@Injectable()
export class AddressServices {
  constructor(private addressService: AddressRepository) {}
  getAllAddresses(
    role: string,
    page: number,
    limit: number,
  ): Promise<{ data: IsAddressInterface[]; currentPage: number }> {
    return this.addressService.getAllAddresses(role, page, limit);
  }

  async createAddress(data: AddressDTO): Promise<GlobalInterface> {
    const response = await this.addressService.createRole(data);
    if (response) {
      return {
        success: true,
        message: 'Created address successfully',
      };
    }
    return {
      success: false,
      message: 'address created failed',
    };
  }

  async updateAddress(
    data: IsAddressInterface,
    id: number,
  ): Promise<GlobalInterface> {
    const response = await this.addressService.updateAddress(data, id);
    if (response.affected === 0) {
      return {
        success: false,
        message: 'Address not found',
      };
    }
    return {
      success: true,
      message: 'Updated address successfully',
    };
  }

  async deleteAddress(id: number): Promise<GlobalInterface> {
    const response = await this.addressService.deleteAddress(id);
    if (!response) {
      return {
        success: false,
        message: 'address not found',
      };
    }
    return {
      success: true,
      message: 'delete address successfully',
    };
  }
}
