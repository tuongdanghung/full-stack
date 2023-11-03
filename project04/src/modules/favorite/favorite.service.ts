import { Injectable } from '@nestjs/common';
import { GlobalInterface } from 'src/shared/interface/global.interface';
import { FavoriteDTO } from './dto/favorite.dto';
import { FavoriteRepository } from './favorite.repository';
@Injectable()
export class FavoriteServices {
  constructor(private favoriteRepo: FavoriteRepository) {}
  getAllFavorite(id: number) {
    return this.favoriteRepo.getAllFavorites(id);
  }

  async createFavorite(data: FavoriteDTO): Promise<GlobalInterface> {
    const response = await this.favoriteRepo.createFavorite(data);
    if (response) {
      return {
        success: true,
        message: 'Add to cart Successfully',
      };
    }
    return {
      success: false,
      message: 'Add to cart failed',
    };
  }

  async deleteFavorite(id: number) {
    const response = await this.favoriteRepo.deleteFavorite(id);
    if (response.affected !== 0) {
      return {
        success: true,
        message: 'delete cart Successfully',
      };
    }
    return {
      success: false,
      message: 'delete cart failed',
    };
  }
}
