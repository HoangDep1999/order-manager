import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ModelEnity } from "src/modules/entities/ModelEntity";
import { BaseEntity, DeepPartial, FindManyOptions, FindOptionsWhere, IsNull, ObjectLiteral, Repository } from "typeorm";


@Injectable()
export class BaseRepository < T extends ModelEnity, R extends Repository<T>, D>{
    constructor(
        @InjectRepository(ModelEnity)
        protected readonly repository: R
    ){}
    async findAllNotDeleted(): Promise<T[]> {
        const options: FindManyOptions<T> = {
            where: {isDeleted: false} as any
        }
        return await this.repository.find(options);
    }

    async findAll(): Promise<T[]> {
        return await this.repository.find();
    }

    async findById(id: number): Promise<T | null> {
        return await this.repository.findOne({
          where: { id } as unknown as FindOptionsWhere<T>,
        });
      }
    async create(data: D): Promise<T> {
        const entity = this.dtoToEntity(data);
        return await this.repository.save(entity);
    }
    async update(id: number, data: T extends DeepPartial<ObjectLiteral> ? ObjectLiteral : {}): Promise<T> {
        await this.repository.update(id, data)
        return this.findById(id);
    }
    async deleteSoft(id: number): Promise<boolean> {
        const entity = await this.repository.findOne({
            where: {id} as unknown as FindOptionsWhere<T>
        })
        if(!entity) return false;
        if(entity.isDeleted) return false;
        entity.isDeleted = true;
        await this.repository.save(entity)
        return true;
    }

    async restore(id: number): Promise<boolean> {
        const entity = await this.repository.findOne({
            where: {id} as unknown as FindOptionsWhere<T>
        })
        if(!entity) return false;
        if(!entity.isDeleted) return false;
        entity.isDeleted = false;
        await this.repository.save(entity)
        return true;
    }

    protected dtoToEntity(dto: D): T {
        const entity = this.repository.create();
        Object.assign(entity, dto); 
        return entity;
      }

}