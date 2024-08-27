import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './users.entity';
import { ModelEnity } from './ModelEntity';

@Entity({name: 'role'})
export class RoleEntity extends ModelEnity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @OneToMany(() => UserEntity, (user) => user.role)
  @JoinColumn({
    name: 'roleId',
    referencedColumnName: 'id',
  })
  user: UserEntity[];
}
