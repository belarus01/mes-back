import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { Role } from './role.enum';


@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private userRepository: typeof User){}

    async createUser(dto:CreateUserDto){
        const user = await this.userRepository.create(dto);
        return user;
    }

    async getAllUsers(){
        const users = await this.userRepository.findAll({include:{all:true}});
        return users;
    }

    async getUserByLogin(login: string){
        const user = await this.userRepository.findOne({where:{login}, include:{all:true}});
        return user;
    }

    async updateUser(userId: number, userDto: CreateUserDto){
        return await this.userRepository.update(
            { 
                login: userDto.login,
                password: userDto.password,
                firstName: userDto.firstName,
                secondName: userDto.secondName,
                lastName: userDto.lastName,
                phone: userDto.phone,
                position: userDto.position,
                role:userDto.role

            }, 
            {
                where:{
                    id: userId
                }
               
            });
    }

}
