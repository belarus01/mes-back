import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { Role } from './role.enum';


@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private userRepository: typeof User){}

    async createUser(dto:CreateUserDto){
        console.log("service");
        console.log(dto);
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

    async deleteUserById(id: number){
        const count = await this.userRepository.destroy({where: {id}});
        return count;
    }

    async updateUser( user: User){
        return await this.userRepository.update(
            { 
                login: user.login,
                password: user.password,
                firstName: user.firstName,
                secondName: user.secondName,
                lastName: user.lastName,
                phone: user.phone,
                position: user.position,
                role:user.role
            }, 
            {
                where:{
                    id: user.id
                }
               
            });
    }

}
