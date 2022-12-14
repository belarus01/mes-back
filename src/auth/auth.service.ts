import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/users.model';

@Injectable()
export class AuthService {

    constructor(private userService: UsersService, private jwtService: JwtService){}

    async login(userDto: LoginUserDto){
        const user = await this.validateUser(userDto);
        console.log(user);
        return this.generateToken(user);
    }

    private async validateUser(userDto: LoginUserDto) {
        const user = await this.userService.getUserByLogin(userDto.login);
        if(!user)
            throw new UnauthorizedException({ message: 'Пользователь с таким логином не существует'});
        const passwordEquals = await bcrypt.compare(userDto.password, user.password);
        if (user && passwordEquals){
            return user;
        }
        throw new UnauthorizedException({ message: 'Некорректный пароль'});
    }
    
    async registration(userDto: CreateUserDto){
        const candidate = await this.userService.getUserByLogin(userDto.login);
        if(candidate){
            throw new HttpException('Пользователь с таким логином уже существует', HttpStatus.BAD_REQUEST);
        }
        const hashPassword = await bcrypt.hash(userDto.password, 5);
        const user = await this.userService.createUser({...userDto, password: hashPassword});
        return this.generateToken(user);
    }

    private async generateToken(user: User) {
        const payload = {login: user.login, id: user.id, role:user.role};
        return{
            token: this.jwtService.sign(
                payload, 
                { 
                    secret: process.env.PRIVATE_KEY, expiresIn:process.env.EXPIRES_IN
                }
            )
        }
    }

    
}
