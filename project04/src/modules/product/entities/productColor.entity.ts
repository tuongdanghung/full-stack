import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { ProductEntity } from './product.entity';
import { ColorEntity } from 'src/modules/color/entities/color.entity';

@Entity('product_colors')
export class ProductColorEntity {
  @PrimaryColumn()
  productsId: number;

  @PrimaryColumn()
  colorsId: number;

  @ManyToOne(
    () => ProductEntity,
    (productEntity) => productEntity.productColors,
  )
  public products: ProductEntity;

  @ManyToOne(() => ColorEntity, (colorEntity) => colorEntity.colors)
  public colors: ColorEntity;
}
