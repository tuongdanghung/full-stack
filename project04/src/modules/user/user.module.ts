import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserServices } from './user.service';
import { UserRepository } from './user.repository';
import { UserEntity } from './entities/user.entity';
import { GenerateToken } from 'src/shared/middlewares/generateToken';
import { SharedDataService } from 'src/shared/middlewares/shareData.service';
import { CloudinaryModule } from 'src/shared/utils/upload/cloudinary.module';
@Module({
  controllers: [UserController],
  imports: [
    TypeOrmModule.forFeature([UserEntity, UserRepository]),
    CloudinaryModule,
  ],
  providers: [UserServices, UserRepository, GenerateToken, SharedDataService],
})
export class UserModule {}
