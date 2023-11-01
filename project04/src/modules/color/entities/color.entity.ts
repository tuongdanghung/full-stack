import { CartEntity } from 'src/modules/cart/entities/cart.entity';
import { ProductColorEntity } from 'src/modules/product/entities/productColor.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('colors')
export class ColorEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: true })
  color: string;

  @OneToMany(
    () => ProductColorEntity,
    (productCapacityEntity) => productCapacityEntity.colors,
  )
  public colors: ProductColorEntity[];

  @OneToMany(() => CartEntity, (cart) => cart.product)
  carts: CartEntity[];

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
