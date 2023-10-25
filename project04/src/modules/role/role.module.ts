import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleController } from './role.controller';
import { RoleServices } from './role.service';
import { RoleRepository } from './role.repository';
import { RoleEntity } from './entities/role.entity';
@Module({
  controllers: [RoleController],
  imports: [TypeOrmModule.forFeature([RoleEntity, RoleRepository])],
  providers: [RoleServices, RoleRepository],
})
export class RoleModule {}
