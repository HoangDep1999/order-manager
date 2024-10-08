import { Module } from "@nestjs/common";
import { UserService } from "./users.service";
import { UserController } from "./users.controller";
import { UserEntity } from "../entities/users.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserRepository } from "src/repository/UserRepository";

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    controllers:[UserController],
    providers:[UserService,
        {
            provide: 'UserRepository',
            useClass: UserRepository
        }
    ],
})
export class UserModule{}