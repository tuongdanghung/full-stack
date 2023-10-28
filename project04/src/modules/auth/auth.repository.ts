// lấy data để trả về controller
import { UserEntity } from './entities/auth.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthDTOServices } from './dto/auth.dto';
import { GlobalInterface } from 'src/shared/interface/global.interface';
import { RoleEntity } from '../role/entities/role.entity';

export class AuthRepository {
  constructor(
    @InjectRepository(UserEntity)
    public userEntity: Repository<UserEntity>,
  ) {}

  async register(data: AuthDTOServices): Promise<any> {
    const options: FindOneOptions<UserEntity> = {
      where: { email: data.email },
    };
    const checkUser = await this.userEntity.findOne(options);
    if (checkUser === null) {
      const emailEdited = btoa(data.email);
      const createUser = this.userEntity.create({
        ...data,
        email: emailEdited,
        role: { id: data.role },
      });
      const response = await this.userEntity.save(createUser);
      return response;
    }
    return false;
  }
}
