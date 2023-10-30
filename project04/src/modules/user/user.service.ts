// lấy data để trả về controller
import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
// import { RoleDTO } from './dto/role.dto';
// import { IsRoleInterface } from './interface/role.interface';
import { GlobalInterface } from 'src/shared/interface/global.interface';
@Injectable()
export class UserServices {
  constructor(private userService: UserRepository) {}
  getAllUsers(role: string, page: number, limit: number) {
    return this.userService.getAllUsers(role, page, limit);
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
