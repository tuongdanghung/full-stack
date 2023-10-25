// lấy data để trả về controller
import { Injectable } from '@nestjs/common';
import { RoleRepository } from './role.repository';
import { RoleDTO } from './dto/role.dto';
import { IsRoleInterface } from './interface/role.interface';
import { GlobalInterface } from 'src/shared/interface/global.interface';
@Injectable()
export class RoleServices {
  constructor(private roleRepo: RoleRepository) {}
  getAllRoles(
    role: string,
    page: number,
    limit: number,
  ): Promise<{ data: IsRoleInterface[]; currentPage: number }> {
    return this.roleRepo.getAllRoles(role, page, limit);
  }

  getOneRole(id: number): Promise<IsRoleInterface> {
    return this.roleRepo.getOneRole(id);
  }

  createRole(data: RoleDTO): Promise<GlobalInterface> {
    return this.roleRepo.createRole(data);
  }

  updateRole(data: RoleDTO, id: number): Promise<GlobalInterface> {
    return this.roleRepo.updateRole(data, id);
  }

  deleteRole(id: number): Promise<GlobalInterface> {
    return this.roleRepo.deleteRole(id);
  }
}
