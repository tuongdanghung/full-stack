import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoriteController } from './favorite.controller';
import { FavoriteRepository } from './favorite.repository';
import { GenerateToken } from 'src/shared/middlewares/generateToken';
import { SharedDataService } from 'src/shared/middlewares/shareData.service';
import { FavoriteServices } from './favorite.service';
import { FavoriteEntity } from './entities/favorite.entity';
@Module({
  controllers: [FavoriteController],
  imports: [TypeOrmModule.forFeature([FavoriteEntity, FavoriteRepository])],
  providers: [
    FavoriteEntity,
    FavoriteServices,
    FavoriteRepository,
    GenerateToken,
    SharedDataService,
  ],
})
export class FavoriteModule {}
