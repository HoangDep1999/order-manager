import { BaseRepository } from "src/repository/BaseRepository";
import { RoleEntity } from "../entities/role.entity";
import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { RoleDTO } from "./dto/role.dto";

@Injectable()
export class RoleRepository extends BaseRepository<RoleEntity, Repository<RoleEntity>, RoleDTO>{
    constructor(
        @InjectRepository(RoleEntity)
        protected readonly roleRepository: Repository<RoleEntity>
    ){
        super(roleRepository)
    }
}