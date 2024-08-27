import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RoleRepository } from "./role.repository";
import { RoleDTO } from "./dto/role.dto";
import { RoleEntity } from "../entities/role.entity";

@Injectable()
export class RoleService{

    constructor(
        // @InjectRepository(RoleRepository)
        private readonly roleRepository: RoleRepository
    ){}

    async getAllRoles(): Promise<RoleEntity[]>{
        return this.roleRepository.findAll();
    }

    async getAllRolesNotDeleted(): Promise<RoleEntity[]>{
        return this.roleRepository.findAllNotDeleted();
    }

    async getRoleById(id:number): Promise<RoleEntity>{
        return this.roleRepository.findById(id);
    }

    async createRole(role: RoleDTO): Promise<RoleEntity>{
        return this.roleRepository.create(role);
    }

    async updateRole(id:number, role: RoleDTO): Promise<RoleEntity>{
        return this.roleRepository.update(id, role)
    }

    async deleteRole(id:number): Promise<boolean>{
        return this.roleRepository.deleteSoft(id);
    }

    async restoreRole(id:number): Promise<boolean>{
        return this.roleRepository.restore(id);
    }
}