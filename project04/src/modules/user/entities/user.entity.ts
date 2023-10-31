import { AddressEntity } from 'src/modules/address/entities/address.entity';
import { RoleEntity } from 'src/modules/role/entities/role.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column({ select: false })
  password: string;

  @Column()
  status: string;

  @Column()
  card_id: string;

  @Column()
  avatar: string;

  @ManyToOne(() => RoleEntity, (role) => role.user, { eager: true })
  role: RoleEntity;
  RoleID: number;

  @OneToMany(() => AddressEntity, (address) => address.user)
  addresses: AddressEntity[];

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
