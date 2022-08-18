import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from './role.enum';

@Controller('users')
export class UsersController {

    constructor(private userService : UsersService){}

    @Post()
    create(@Body() userDto : CreateUserDto){
        return this.userService.createUser(userDto);
    }

    @Roles(Role.Admin)
    @UseGuards(RolesGuard)
    @Get()
    getAll(){
        return this.userService.getAllUsers();
    }
}
