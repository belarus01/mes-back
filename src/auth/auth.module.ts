import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtService],
  imports:[
    forwardRef(()=>UsersModule),
    JwtModule
  ],
  exports: [
    AuthService,
    JwtModule
]
})
export class AuthModule {}
