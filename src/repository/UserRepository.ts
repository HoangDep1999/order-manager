import { BadRequestException, ConflictException, Injectable } from "@nestjs/common";
import { BaseRepository } from "./BaseRepository";
import { UserEntity } from "src/modules/entities/users.entity";
import { FindManyOptions, Repository } from "typeorm";
import { UserDTO } from "src/modules/users/dto/user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { IUserRepository } from "src/interface/IUserRepository";
import { endCodePassword } from "src/util/bcrypt";

@Injectable()
export class UserRepository extends BaseRepository<UserEntity, Repository<UserEntity>, UserDTO> implements IUserRepository{
    constructor(
        @InjectRepository(UserEntity)
        protected readonly userRepository: Repository<UserEntity>
    ){
        super(userRepository)
    }
    
    async findAllUser(limit: number, page: number): Promise<UserEntity[]> {
        const offset = (page - 1)* limit;
        const options: FindManyOptions<UserEntity> = {
            where: {isDeleted: false} ,
            take: limit,
            skip: offset 
        }
        return await this.userRepository.find(options)
    }
    async createOrUpdate(user: UserDTO): Promise<UserEntity> {
        try {
            const checkId = await this.userRepository.find({ where: {id: user.id} });
            for await (const item of checkId){
                if(item?.email === user?.email){
                    console.log('Email đã được sử dụng');
                    throw new BadRequestException('Email đã được sử dụng');
                }
                if(item?.phone === user?.phone){
                    console.log('Phone đã được sử dụng');
                    throw new BadRequestException('Phone đã được sử dụng');
                }
            }
            const password = await endCodePassword(user.password);
            const newUser=  await this.userRepository.create({...user, password});
            await this.userRepository.save(newUser);
            return newUser;
            
        } catch (error) {
            console.log('Loi', error);
        }
        
    }
    delete(id: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    
}