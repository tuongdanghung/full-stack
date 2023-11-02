import { CartEntity } from 'src/modules/cart/entities/cart.entity';
import { OrderItemEntity } from 'src/modules/order/entities/orderItem.entity';
import { ProductCapacityEntity } from 'src/modules/product/entities/productCapacity.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('capacities')
export class CapacityEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: true })
  size: number;

  @Column({ unique: true, nullable: true })
  percent: number;

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

  @OneToMany(
    () => ProductCapacityEntity,
    (productCapacityEntity) => productCapacityEntity.capacities,
  )
  @OneToMany(() => CartEntity, (cart) => cart.product)
  carts: CartEntity[];

  @OneToMany(() => OrderItemEntity, (orderItem) => orderItem.product)
  orderItems: OrderItemEntity[];

  public productCapacities: ProductCapacityEntity[];
}
