import { CanActivate, ExecutionContext, UnauthorizedException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';
import { Role } from 'src/users/role.enum';

@Injectable()
export class RolesGuard implements CanActivate{
    constructor(private jwtService: JwtService, private reflector: Reflector){}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
        ])

        if(!requiredRoles){
            return true;
        }

        const req = context.switchToHttp().getRequest();
        try{
            const authHeader = req.headers.authorization;
            const bearer = authHeader.split(' ')[0];
            const token = authHeader.split(' ')[1];

            if(bearer !== 'Bearer' || !token){
               throw new UnauthorizedException({message: 'Пользователь не авторизован'});
            }
           
            const user = this.jwtService.verify(token, {secret: process.env.PRIVATE_KEY});
            req.user = user;
            return requiredRoles.some((role) => user.role === role);

        }catch(e){
            throw new HttpException('Нет доступа', HttpStatus.FORBIDDEN);
        }
    }
    
}