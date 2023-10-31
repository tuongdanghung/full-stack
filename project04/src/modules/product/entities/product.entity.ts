import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { ImageEntity } from './image.entity';
import { CategoryEntity } from 'src/modules/category/entities/category.entity';
import { BrandEntity } from 'src/modules/brand/entities/brand.entity';
@Entity('products')
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
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

  @OneToMany(() => ImageEntity, (image) => image.product)
  images: ImageEntity[];

  @ManyToOne(() => CategoryEntity, (category) => category.product)
  category: CategoryEntity;

  @ManyToOne(() => BrandEntity, (category) => category.brand)
  brand: BrandEntity;

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
