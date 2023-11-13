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
  public products: ProductEntity;

  @ManyToOne(
    () => CapacityEntity,
    (capacityEntity) => capacityEntity.productCapacities,
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  )
  public capacities: CapacityEntity;
}
