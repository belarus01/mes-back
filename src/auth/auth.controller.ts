import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { Json } from 'sequelize/types/utils';
import { Role } from 'src/users/role.enum';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Roles } from './roles.decorator';
import { RolesGuard } from './roles.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('/login')
    login(@Body() userDto: LoginUserDto){
        return this.authService.login(userDto);
    }

    @UseGuards(RolesGuard)
    @Roles(Role.Syperadmin)
    @Post('/registration')
    registration(@Body() userDto: CreateUserDto){
        return this.authService.registration(userDto);
    }

}
