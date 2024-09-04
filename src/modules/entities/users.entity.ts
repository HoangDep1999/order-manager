import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { RoleEntity } from "./role.entity";
import { ModelEnity } from "./ModelEntity";


@Entity({name: 'users'})
export class UserEntity extends ModelEnity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({unique: true})
    email: string;

    @Column()
    account: string;

    @Column()
    password: string;

    @Column({unique: true})
    phone: string;

    @ManyToOne(()=> RoleEntity)
    @JoinColumn({
        name:'roleId', referencedColumnName: 'id'
    })
    role: RoleEntity;

    @Column()
    status: number;

}