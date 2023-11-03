import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { OrderEntity } from './order.entity';
import { ProductEntity } from 'src/modules/product/entities/product.entity';
import { CapacityEntity } from 'src/modules/capacity/entities/capacity.entity';
import { ColorEntity } from 'src/modules/color/entities/color.entity';

@Entity('orderitems')
export class OrderItemEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ select: false })
  productId: number;

  @Column({ select: false })
  colorId: number;

  @Column({ select: false })
  capacityId: number;

  @Column()
  quantity: number;

  @Column()
  total: number;

  @Column()
  codeOrder: number;

  @ManyToOne(() => OrderEntity, (order) => order.orderItems, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'codeOrder', referencedColumnName: 'codeOrder' })
  order: OrderEntity;

  @ManyToOne(() => ProductEntity, (product) => product.orderItems, {
    eager: true,
  })
  product: ProductEntity;

  @ManyToOne(() => CapacityEntity, (capacity) => capacity.orderItems, {
    eager: true,
  })
  capacity: CapacityEntity;

  @ManyToOne(() => ColorEntity, (color) => color.orderItems, {
    eager: true,
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
