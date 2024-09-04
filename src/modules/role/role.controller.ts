import { Controller, Get, Post, Put, Delete, Body, Param, ValidationPipe } from "@nestjs/common";
import { RoleService } from "./role.service";
import { RoleEntity } from "../entities/role.entity";
import { ReponseData } from "src/global/globalClass";
import { HttpMessage, HttpStatus } from "src/global/globalEnum";
import { ResponseType } from "src/global/globalType";
import { RoleDTO } from "./dto/role.dto";

@Controller('roles')
export class RoleController{
    constructor(
        private readonly roleService: RoleService
    ){}
    @Get()
    async getAllRole(): Promise<ResponseType<RoleEntity>>{
        try {
            return new ReponseData(await this.roleService.getAllRoles(), HttpStatus.SUCCESS, HttpMessage.SUCCESS)
        } catch (error) {
            return new ReponseData([], HttpStatus.ERROR, HttpMessage.ERROR)
        }
    }

    @Get(':id')
    async getRoleById(@Param('id') id:number): Promise<ResponseType<RoleEntity>>{
        try {
            return new ReponseData(await this.roleService.getRoleById(id), HttpStatus.SUCCESS, HttpMessage.SUCCESS)
        } catch (error) {
            return new ReponseData([], HttpStatus.ERROR, HttpMessage.ERROR)
        }
    }

    @Post()
    async createRole(@Body(new ValidationPipe()) role: RoleDTO): Promise<ResponseType<RoleEntity>>{
        try {
            return new ReponseData(await this.roleService.createRole(role), HttpStatus.SUCCESS, HttpMessage.SUCCESS)
        } catch (error) {
            return new ReponseData(null, HttpStatus.ERROR, HttpMessage.ERROR)
        }
    }

    @Put(':id')
    async updateRole(@Param('id') id:number, @Body(new ValidationPipe()) role: RoleDTO):Promise<ResponseType<RoleEntity>>{
        try {
            return new ReponseData(await this.roleService.updateRole(id, role), HttpStatus.SUCCESS, HttpMessage.SUCCESS)
        } catch (error) {
            return new ReponseData(null, HttpStatus.ERROR, HttpMessage.ERROR)
        }
    }


    @Delete(':id')
    async deleteRole(@Param('id') id:number):Promise<ResponseType<boolean>>{
        try {
            const isCheckDelete = await this.roleService.deleteRole(id);
            if(isCheckDelete){
                return new ReponseData(isCheckDelete, HttpStatus.SUCCESS, HttpMessage.SUCCESS)
            }else{
                return new ReponseData(isCheckDelete, HttpStatus.ERROR, HttpMessage.ERROR)
            }
        } catch (error) {
            return new ReponseData(null, HttpStatus.ERROR, HttpMessage.ERROR)
        }
    }

    @Post(':id')
    async restoreRole(@Param('id') id:number):Promise<ResponseType<boolean>>{
        try {
            const isCheckDelete = await this.roleService.restoreRole(id);
            if(isCheckDelete){
                return new ReponseData(isCheckDelete, HttpStatus.SUCCESS, HttpMessage.SUCCESS)
            }else{
                return new ReponseData(isCheckDelete, HttpStatus.ERROR, HttpMessage.ERROR)
            }
        } catch (error) {
            return new ReponseData(null, HttpStatus.ERROR, HttpMessage.ERROR)
        }
    }
}