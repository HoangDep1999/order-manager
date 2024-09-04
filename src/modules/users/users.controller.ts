import { Body, Controller, Delete, Get, Param, Post, Put, Query, ValidationPipe } from "@nestjs/common";
import { UserService } from "./users.service";
import { ResponseType } from "src/global/globalType";
import { UserEntity } from "../entities/users.entity";
import { ReponseData } from "src/global/globalClass";
import { HttpMessage, HttpStatus } from "src/global/globalEnum";
import { UserDTO } from "./dto/user.dto";

@Controller('users')
export class UserController{
    constructor(
        private readonly userService: UserService
    ){}

    @Get()
    async getAllUser(@Query('limit') limit: number, @Query('page') page:number): Promise<ResponseType<UserEntity>>{
        try {
            return new ReponseData(await this.userService.getAllUser(limit,page), HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ReponseData([], HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }

    @Get(':id')
    async getUserById(@Param('id') id: number): Promise<ResponseType<UserEntity>>{
        try {
            return new ReponseData(await this.userService.getUserById(id), HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ReponseData(null, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }

    @Post()
    async createUser(@Body(new ValidationPipe()) user: UserDTO): Promise<ResponseType<UserEntity>>{
        try {
            return new ReponseData(await this.userService.createOrUpdateUser(user), HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ReponseData(null, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }

    @Put(':id')
    async updateUser(@Param('id') id:number, @Body(new ValidationPipe()) user: UserDTO): Promise<ResponseType<UserEntity>>{
        try {
            return new ReponseData(await this.userService.updateUser(id, user), HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ReponseData(null, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }

    @Delete(':id')
    async unableUser(@Param('id') id: number): Promise<ResponseType<boolean>>{
        try {
            return new ReponseData(await this.userService.unableUser(id), HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ReponseData(null, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }

    @Post(':id')
    async restore(@Param('id') id: number): Promise<ResponseType<boolean>>{
        try {
            return new ReponseData(await this.userService.ableUser(id), HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            return new ReponseData(null, HttpStatus.ERROR, HttpMessage.ERROR);
        }
    }
    
}