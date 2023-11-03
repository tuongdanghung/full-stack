import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ISFavoriteInterface } from './interface/favorite.interface';
import { FavoriteEntity } from './entities/favorite.entity';

export class FavoriteRepository {
  constructor(
    @InjectRepository(FavoriteEntity)
    public favoriteRepository: Repository<FavoriteEntity>,
  ) {}
  async getAllFavorites(userId: number) {
    const data = await this.favoriteRepository.find({
      where: { userId },
      relations: ['product', 'capacity', 'color'],
    });
    return data;
  }

  async createFavorite(data: ISFavoriteInterface): Promise<any> {
    const cartItem = await this.favoriteRepository.findOne({
      where: {
        userId: data.userId,
        productId: data.productId,
        colorId: data.colorId,
        capacityId: data.capacityId,
      },
    });
    if (cartItem === null) {
      this.favoriteRepository.create(data);
      return await this.favoriteRepository.save(data);
    }
  }

  async deleteFavorite(id: number): Promise<any> {
    return this.favoriteRepository.delete(id);
  }
}
