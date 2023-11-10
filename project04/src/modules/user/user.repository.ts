// lấy data để trả về controller
import { UserEntity } from './entities/user.entity';
import { ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDTO } from './dto/user.dto';
// import { IsRoleInterface } from './interface/role.interface';
import { GlobalInterface } from 'src/shared/interface/global.interface';

export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    public userRepository: Repository<UserEntity>,
  ) {}

  async createUser(data: any): Promise<any> {
    const createUser = this.userRepository.create({
      ...data,
      roleId: 1,
    });
    const response = await this.userRepository.save(createUser);
  }

  async getAllUsers(
    email: string,
    page: number,
    limit: number,
  ): Promise<{ data: UserEntity[]; currentPage: number }> {
    const skip = (page - 1) * limit;
    const data = await this.userRepository.find({
      where: email ? { email: ILike(`%${email}%`) } : {},
      relations: ['addresses'],
      skip,
    });

    const currentPage = Math.ceil((skip + 1) / limit);

    return { data, currentPage };
  }

  getOneUser(id: number): Promise<any> {
    return this.userRepository.findOne({
      where: { id },
      relations: ['addresses'],
    });
  }

  async updateRole(data: any, id: number): Promise<boolean> {
    const updatedUser = await this.userRepository.update(id, data);
    if (updatedUser.affected === 1) {
      return true;
    }
    return false;
  }

  async updateUserByAdmin(id: number, data: any): Promise<boolean> {
    const updatedUser = await this.userRepository.update(id, data);
    if (updatedUser.affected === 1) {
      return true;
    }
    return false;
  }
}
