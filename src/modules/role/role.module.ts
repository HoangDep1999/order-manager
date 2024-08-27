import { Module } from "@nestjs/common";
import { RoleController } from "./role.controller";
import { RoleService } from "./role.service";
import { RoleRepository } from "./role.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RoleEntity } from "../entities/role.entity";
@Module({
    imports: [TypeOrmModule.forFeature([RoleEntity])], 
  providers: [RoleRepository, RoleService], 
  controllers: [RoleController],
  exports: [RoleRepository, RoleService],
})
export class RoleModule{}