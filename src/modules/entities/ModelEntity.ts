import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from "typeorm";

export class ModelEnity extends BaseEntity{

    @CreateDateColumn({
        name: 'created_at',
        type: 'timestamp',
        nullable: true
    })
    createdAt: Date;

    @UpdateDateColumn({
        name: 'updated_at',
        type: 'timestamp',
        nullable: true
    })
    updatedAt: Date;

    @Column({default:false})
    isDeleted: boolean;
}