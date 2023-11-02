import { CapacityEntity } from 'src/modules/capacity/entities/capacity.entity';
import { ColorEntity } from 'src/modules/color/entities/color.entity';
import { ProductEntity } from 'src/modules/product/entities/product.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity('carts')
export class CartEntity {
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

  @Column()
  quantity: number;

  @ManyToOne(() => UserEntity, (user) => user.carts)
  user: UserEntity;

  @ManyToOne(() => ProductEntity, (product) => product.carts)
  product: ProductEntity;

  @ManyToOne(() => CapacityEntity, (capacity) => capacity.carts)
  capacity: CapacityEntity;

  @ManyToOne(() => ColorEntity, (color) => color.carts)
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
