import { Body, Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from './role.enum';
import { Param, Put } from '@nestjs/common/decorators';
import { User } from './users.model';

@Controller('users')
export class UsersController {

    constructor(private userService : UsersService){}

    @Post()
    create(@Body() userDto : CreateUserDto){
        console.log("controller");
        console.log(userDto);
        return this.userService.createUser(userDto);
    }

    @Roles(Role.Syperadmin)
    @UseGuards(RolesGuard)
    @Get()
    getAll(){
        return this.userService.getAllUsers();
    }

    @Roles(Role.Admin)
    @UseGuards(RolesGuard)
    @Get('/:login')
    getUserByLogin(@Param('login') login: string){
        return this.userService.getUserByLogin(login);
    }

    @Roles(Role.Syperadmin)
    @UseGuards(RolesGuard)
    @Delete('/:id')
    deleteUserById(@Param('id') id: number){
        return this.userService.deleteUserById(id);
    }

    @Roles(Role.Syperadmin)
    @UseGuards(RolesGuard)
    @Put()
    updateUser(@Body() user: User){
        console.log(user);
        return this.userService.updateUser(user);
    }

}
