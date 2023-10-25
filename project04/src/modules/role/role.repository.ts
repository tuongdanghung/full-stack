// lấy data để trả về controller
import { RoleEntity } from './entities/role.entity';
import { ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleDTO } from './dto/role.dto';
import { IsRoleInterface } from './interface/role.interface';
import { GlobalInterface } from 'src/shared/interface/global.interface';

export class RoleRepository {
  constructor(
    @InjectRepository(RoleEntity)
    public roleRepository: Repository<RoleEntity>,
  ) {}

  async getAllRoles(
    role: string,
    page: number,
    limit: number,
  ): Promise<{ data: IsRoleInterface[]; currentPage: number }> {
    const skip = (page - 1) * limit;
    const data = await this.roleRepository.find({
      where: role && { code: ILike(`%${role}%`) },
      skip,
      take: limit,
    });
    const currentPage = Math.ceil((skip + 1) / limit);

    return { data, currentPage };
  }

  getOneRole(id: number): Promise<IsRoleInterface> {
    return this.roleRepository.findOneBy({ id });
  }

  async createRole(data: RoleDTO): Promise<GlobalInterface> {
    this.roleRepository.create(data);
    await this.roleRepository.save(data);
    return {
      success: true,
      message: 'Created role successfully',
    };
  }

  async updateRole(data: RoleDTO, id: number): Promise<GlobalInterface> {
    const updatedRole = await this.roleRepository.update(id, data);
    if (updatedRole.affected === 0) {
      return {
        success: false,
        message: 'Role updated failed',
      };
    }
    return {
      success: true,
      message: 'Role updated successfully',
    };
  }

  async deleteRole(id: number): Promise<GlobalInterface> {
    let roleItem = await this.roleRepository.findOneBy({ id });
    if (!roleItem) {
      return {
        success: false,
        message: 'Role not found',
      };
    }

    this.roleRepository.delete(id);
    return {
      success: true,
      message: 'Delete role successfully',
    };
  }
}
