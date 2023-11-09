import { CapacityEntity } from 'src/modules/capacity/entities/capacity.entity';
import { ColorEntity } from 'src/modules/color/entities/color.entity';
import { ProductEntity } from 'src/modules/product/entities/product.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity('favorites')
export class FavoriteEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ select: false })
  userId: number;

  @Column()
  productId: number;

  @Column()
  colorId: number;

  @Column()
  capacityId: number;

  @ManyToOne(() => ProductEntity, (product) => product.favorites, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  product: ProductEntity;

  @ManyToOne(() => CapacityEntity, (capacity) => capacity.favorites)
  capacity: CapacityEntity;

  @ManyToOne(() => ColorEntity, (color) => color.favorites, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  color: ColorEntity;

  @Column({
    select: false,
    name: 'createdAt',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  public createdAt: string;

  @Column({
    select: false,
    name: 'updatedAt',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  public updatedAt: string;
}
