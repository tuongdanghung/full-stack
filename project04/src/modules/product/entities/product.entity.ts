import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { ImageEntity } from './image.entity';
import { CategoryEntity } from 'src/modules/category/entities/category.entity';
import { BrandEntity } from 'src/modules/brand/entities/brand.entity';
import { CapacityEntity } from 'src/modules/capacity/entities/capacity.entity';
import { ProductCapacityEntity } from './productCapacity.entity';
import { ColorEntity } from 'src/modules/color/entities/color.entity';
import { ProductColorEntity } from './productColor.entity';
import { CartEntity } from 'src/modules/cart/entities/cart.entity';
import { OrderItemEntity } from 'src/modules/order/entities/orderItem.entity';
import { FavoriteEntity } from 'src/modules/favorite/entities/favorite.entity';
@Entity('products')
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column({ select: false })
  brandId: number;

  @Column({ select: false })
  categoryId: number;

  @Column()
  price: number;

  @Column({ default: 1 })
  active: number;

  @Column()
  stock: number;

  @OneToMany(() => ImageEntity, (image) => image.product, { eager: true })
  images: ImageEntity[];

  @ManyToOne(() => CategoryEntity, (category) => category.product, {
    eager: true,
  })
  category: CategoryEntity;

  @ManyToOne(() => BrandEntity, (category) => category.brand, { eager: true })
  brand: BrandEntity;

  @ManyToMany(() => CapacityEntity)
  @JoinTable({ name: 'product_capacities' })
  capacities: CapacityEntity[];

  @ManyToMany(() => ColorEntity)
  @JoinTable({ name: 'product_colors' })
  colors: ColorEntity[];

  @OneToMany(
    () => ProductCapacityEntity,
    (productCapacityEntity) => productCapacityEntity.productsId,
  )
  public productCapacities: ProductCapacityEntity[];

  @OneToMany(
    () => ProductColorEntity,
    (productColorEntity) => productColorEntity.productsId,
  )
  public productColors: ProductColorEntity[];

  @OneToMany(() => CartEntity, (cart) => cart.product)
  carts: CartEntity[];

  @OneToMany(() => OrderItemEntity, (orderItem) => orderItem.product)
  orderItems: OrderItemEntity[];

  @OneToMany(() => FavoriteEntity, (favorite) => favorite.product)
  favorites: FavoriteEntity[];

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
