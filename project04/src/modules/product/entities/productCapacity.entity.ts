import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { ProductEntity } from './product.entity';
import { CapacityEntity } from 'src/modules/capacity/entities/capacity.entity';

@Entity('product_capacities')
export class ProductCapacityEntity {
  @PrimaryColumn()
  productsId: number;

  @PrimaryColumn()
  capacitiesId: number;

  @ManyToOne(
    () => ProductEntity,
    (productEntity) => productEntity.productCapacities,
  )
  public product: ProductEntity;

  @ManyToOne(
    () => CapacityEntity,
    (capacityEntity) => capacityEntity.productCapacities,
  )
  public category: CapacityEntity;
}
