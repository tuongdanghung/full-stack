// lấy data để trả về controller
import { UserEntity } from './entities/auth.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterDTOServices, LoginDTO } from './dto/auth.dto';
import { GenerateToken } from 'src/shared/middlewares/generateToken';
import * as bcrypt from 'bcryptjs';
export class AuthRepository {
  constructor(
    @InjectRepository(UserEntity)
    public userEntity: Repository<UserEntity>,
    private readonly generateToken: GenerateToken,
  ) {}

  async register(data: RegisterDTOServices): Promise<any> {
    const options: FindOneOptions<UserEntity> = {
      where: { email: data.email },
    };
    const checkUser = await this.userEntity.findOne(options);
    if (checkUser === null) {
      const emailEdited = btoa(data.email);
      const createUser = this.userEntity.create({
        ...data,
        email: emailEdited,
      });
      const response = await this.userEntity.save(createUser);
      return response;
    }
    return false;
  }

  async verifyAccount(card_id: string): Promise<any> {
    const options: FindOneOptions<UserEntity> = {
      where: { card_id },
    };

    const checkUser = await this.userEntity.findOne(options);
    if (checkUser) {
      const hashEmail = atob(checkUser.email);
      const updatedAccount = await this.userEntity.update(checkUser.id, {
        email: hashEmail,
      });
      return updatedAccount;
    }
    return checkUser;
  }

  async login(req: LoginDTO) {
    const options: FindOneOptions<UserEntity> = {
      where: { email: req.email },
    };
    const checkUser = await this.userEntity.findOne(options);
    if (checkUser) {
      const isChecked =
        checkUser && bcrypt.compareSync(req.password, checkUser.password);
      const dataGenerateToken = {
        id: checkUser.id,
        email: checkUser.email,
        card_id: checkUser.card_id,
        firstName: checkUser.firstName,
        lastName: checkUser.lastName,
        roleId: checkUser.roleId,
      };
      const access_token = isChecked
        ? this.generateToken.signJwt({ dataGenerateToken })
        : null;
      return {
        success: true,
        data: dataGenerateToken,
        access_token,
      };
    }
    return false;
  }
}
