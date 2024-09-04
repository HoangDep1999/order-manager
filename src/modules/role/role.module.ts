import { Module } from "@nestjs/common";
import { RoleController } from "./role.controller";
import { RoleService } from "./role.service";
import { RoleRepository } from "../../repository/RoleRepository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RoleEntity } from "../entities/role.entity";
@Module({
    imports: [TypeOrmModule.forFeature([RoleEntity])], 
  providers: [RoleService,
    {
      provide: 'RoleRepository',
      useClass: RoleRepository
    }
  ], 
  controllers: [RoleController],
  // exports: [RoleService],
})
export class RoleModule{}