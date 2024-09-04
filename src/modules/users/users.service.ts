import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from 'src/repository/UserRepository';
import { UserEntity } from '../entities/users.entity';
import { UserDTO } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('UserRepository')
    protected readonly userRepository: UserRepository,
  ) {}

  async getAllUser(limit: number, page: number): Promise<UserEntity[]> {
    const users =  await this.userRepository.findAllUser(limit, page);
    const getUsers = users.map(user => {
      const { password, ...rest} = user;
      return rest as UserEntity
    });
    return getUsers;
  }

  async getUserById(id: number): Promise<UserEntity> {
    const item =  await this.userRepository.findById(id);
    const {password, ...rest} = item;
    return rest as UserEntity;
  }

  async createOrUpdateUser(user: UserDTO): Promise<UserEntity>{
      return await this.userRepository.createOrUpdate(user);
  }
  
  async updateUser(id: number, user: UserDTO): Promise<UserEntity> {
    return await this.userRepository.update(id, user);
  }

  async unableUser(id: number): Promise<boolean> {
    return await this.userRepository.deleteSoft(id);
  }

  async ableUser(id: number): Promise<boolean> {
    return await this.userRepository.restore(id);
  }
}
