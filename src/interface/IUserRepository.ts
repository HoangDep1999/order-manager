import { UserEntity } from "src/modules/entities/users.entity";
import { IRepository } from "./IRepository";
import { UserDTO } from "src/modules/users/dto/user.dto";

export interface IUserRepository extends IRepository<UserEntity>{
    findAllUser(limit:number, page:number): Promise<UserEntity[]>;
    // createOrUpdate(user: UserDTO): Promise<UserEntity>;
}