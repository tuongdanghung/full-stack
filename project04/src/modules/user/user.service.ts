import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcryptjs';
import { GlobalInterface } from 'src/shared/interface/global.interface';
import * as makeToken from 'uniqid';
@Injectable()
export class UserServices {
  constructor(private userService: UserRepository) {}
  getAllUsers(role: string, page: number, limit: number) {
    return this.userService.getAllUsers(role, page, limit);
  }

  createUser(data: any) {
    const cardEncryption = makeToken();
    const card_id: string = cardEncryption;
    const hashPassword = (password: string) =>
      bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const newData = {
      ...data,
      card_id,
      roleId: 1,
      password: hashPassword(JSON.stringify(data.password)),
    };
    return this.userService.createUser(newData);
  }

  getOneUser(id: number) {
    return this.userService.getOneUser(id);
  }

  async updateUser(data: any, id: number): Promise<GlobalInterface> {
    const response = await this.userService.updateRole(data, id);
    if (response) {
      return {
        success: true,
        message: 'Updated user successfully',
      };
    }
    return {
      success: false,
      message: 'User update failed',
    };
  }

  async updateUserByAdmin(data: any, id: number): Promise<GlobalInterface> {
    const response = await this.userService.updateUserByAdmin(id, data);
    if (response) {
      return {
        success: true,
        message: 'User updated successfully',
      };
    }
    return {
      success: false,
      message: 'User updated successfully',
    };
  }
}
