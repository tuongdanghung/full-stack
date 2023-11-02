import { AddressEntity } from 'src/modules/address/entities/address.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  Index,
} from 'typeorm';
import { OrderItemEntity } from './orderItem.entity';

@Entity('orders')
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ select: false })
  userId: number;

  @Column({ select: false })
  addressId: number;

  @Column()
  paymentId: number;

  @Index()
  @Column()
  codeOrder: number;

  @Column({ default: 'Pending' })
  status: string;

  @ManyToOne(() => UserEntity, (user) => user.orders)
  user: UserEntity;

  @ManyToOne(() => AddressEntity, (user) => user.orders)
  address: AddressEntity;

  @OneToMany(() => OrderItemEntity, (orderItem) => orderItem.order, {
    eager: true,
  })
  orderItems: OrderItemEntity[];

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
